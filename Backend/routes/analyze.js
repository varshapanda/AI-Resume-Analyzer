const express = require('express');
const router = express.Router();

// Analyze resume endpoint
router.post('/analyze', async (req, res) => {
  console.log('Analysis request received');
  
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Resume text and job description are required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.log('API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const prompt = `
    Analyze this resume against the job description and provide a detailed assessment:

    RESUME:
    ${resumeText}

    JOB DESCRIPTION:
    ${jobDescription}

    Please provide:
    1. Match Score (0-100%)
    2. Top 3 Strengths
    3. Top 3 Areas for Improvement
    4. Missing Skills
    5. 5 Likely Interview Questions with suggested answers

    Format as JSON:
    {
      "matchScore": number,
      "strengths": ["strength1", "strength2", "strength3"],
      "improvements": ["improvement1", "improvement2", "improvement3"],
      "missingSkills": ["skill1", "skill2", "skill3"],
      "interviewQuestions": [
        {
          "question": "question text",
          "suggestedAnswer": "answer text"
        }
      ]
    }
    `;

    console.log('Calling Gemini API...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');
    
    const resultText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysisResult = JSON.parse(jsonMatch[0]);
      console.log('Analysis completed successfully');
      res.json(analysisResult);
    } else {
      console.error('Could not parse analysis result:', resultText);
      throw new Error('Could not parse analysis result');
    }

  } catch (error) {
    console.error('Error in analysis endpoint:', error);
    res.status(500).json({ error: 'Failed to analyze resume: ' + error.message });
  }
});

module.exports = router;