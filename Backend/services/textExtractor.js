const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

// Function to extract text from different file types
async function extractTextFromFile(filePath, mimetype) {
  console.log(`Extracting text from ${filePath}, type: ${mimetype}`);
  
  try {
    switch (mimetype) {
      case 'application/pdf':
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        return pdfData.text;
        
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docResult = await mammoth.extractRawText({ path: filePath });
        return docResult.value;
        
      case 'text/plain':
        return fs.readFileSync(filePath, 'utf8');
        
      default:
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  } finally {
    // Clean up: delete the uploaded file after processing
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up file: ${filePath}`);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError);
    }
  }
}

module.exports = { extractTextFromFile };