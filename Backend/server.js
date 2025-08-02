const express = require('express');
require('dotenv').config();

// Import middleware
const corsMiddleware = require('./middleware/cors');
const loggerMiddleware = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const healthRoutes = require('./routes/health');
const uploadRoutes = require('./routes/upload');
const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(loggerMiddleware);

// Routes
app.use('/api', healthRoutes);
app.use('/api', uploadRoutes);
app.use('/api', analyzeRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Exit gracefully
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GEMINI_API_KEY loaded: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});