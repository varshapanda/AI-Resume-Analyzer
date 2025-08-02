import React from 'react';
import { Upload } from 'lucide-react';
import { uploadFile } from '../services/api';

const FileUploader = ({ setResumeText, uploading, setUploading }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const result = await uploadFile(file);
      setResumeText(result.text);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="flex items-center justify-center w-full h-32 border border-gray-700 bg-gray-800 hover:bg-gray-750 cursor-pointer transition-colors">
        <div className="text-center">
          <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
          <span className="text-xs text-gray-400 font-light">
            {uploading ? 'PROCESSING...' : 'UPLOAD DOCUMENT'}
          </span>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept=".txt,.pdf,.doc,.docx" 
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default FileUploader;