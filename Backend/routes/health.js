const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5000,
    geminiApiKeyConfigured: !!process.env.GEMINI_API_KEY
  });
});

module.exports = router;