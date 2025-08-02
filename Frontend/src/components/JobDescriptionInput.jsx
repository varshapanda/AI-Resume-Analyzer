import React from 'react';
import { Briefcase } from 'lucide-react';

const JobDescriptionInput = ({ jobDescription, setJobDescription }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-sm p-8">
      <div className="flex items-center mb-6">
        <Briefcase className="text-white mr-3" size={20} />
        <h2 className="text-xl font-light tracking-wide">POSITION</h2>
      </div>
      
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter job description..."
        className="w-full h-64 px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white resize-none font-mono text-sm"
      />
    </div>
  );
};

export default JobDescriptionInput;