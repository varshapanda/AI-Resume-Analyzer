import React from 'react';
import { FileText } from 'lucide-react';
import FileUploader from './FileUploader';

const ResumeInput = ({ resumeText, setResumeText, uploading, setUploading }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-sm p-8">
      <div className="flex items-center mb-6">
        <FileText className="text-white mr-3" size={20} />
        <h2 className="text-xl font-light tracking-wide">RESUME</h2>
      </div>
      
      <FileUploader
        setResumeText={setResumeText}
        uploading={uploading}
        setUploading={setUploading}
      />
      
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Enter resume content..."
        className="w-full h-40 px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white resize-none font-mono text-sm"
      />
    </div>
  );
};

export default ResumeInput;