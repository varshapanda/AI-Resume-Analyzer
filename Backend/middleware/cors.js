const cors = require('cors');

const corsMiddleware = cors({
  origin: [
    'https://ai-resume-analyzer-ashy.vercel.app',
    'http://localhost:3000',  // for testing locally
    'http://localhost:5173'   // for Vite dev server
  ],
});

module.exports = corsMiddleware;