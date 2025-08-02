const express = require('express');
const fs = require('fs');
const router = express.Router();
const { upload } = require('../config/multer');
const { extractTextFromFile } = require('../services/textExtractor');

// Upload and extract text endpoint
router.post('/upload', upload.single('resume'), async (req, res) => {
  console.log('Upload request received');
  
  try {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.originalname, req.file.mimetype);
    const extractedText = await extractTextFromFile(req.file.path, req.file.mimetype);
    
    console.log('Text extracted successfully, length:', extractedText.length);
    
    res.json({ 
      text: extractedText,
      filename: req.file.originalname,
      success: true 
    });

  } catch (error) {
    console.error('Error in upload endpoint:', error);
    
    // Clean up file if extraction failed
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up failed upload:', cleanupError);
      }
    }
    
    res.status(500).json({ error: 'Failed to extract text from file: ' + error.message });
  }
});

module.exports = router;