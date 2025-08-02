const cors = require('cors');

const corsMiddleware = cors({
  origin: 'https://ai-resume-analyzer-ashy.vercel.app',
  credentials: true
});

module.exports = corsMiddleware;