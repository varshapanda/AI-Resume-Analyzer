const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Analyze resume endpoint
router.post('/analyze', async (req, res) => {
  console.log('Analysis request received');

  try {
    const { resumeText, jobDescription } = req.body;

    // Basic validation
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Resume text and job description are required' });
    }

    if (!process.env.GEMINI_API_KEY) {
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

    console.log('Calling Gemini model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); 
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const resultText = response.text();

    // Attempt to parse JSON response from model output
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
