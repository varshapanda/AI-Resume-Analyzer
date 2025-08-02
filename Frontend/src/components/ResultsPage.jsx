import React from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Star } from 'lucide-react';

const ResultsPage = ({ analysis, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentPage('analyze')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span className="font-light text-sm tracking-wide">BACK TO ANALYZER</span>
          </button>
          <h1 className="text-3xl font-thin tracking-wide absolute left-1/2 transform -translate-x-1/2">ANALYSIS RESULTS</h1>
          <div></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Score and Overview */}
          <div className="bg-gray-900 border border-gray-800 rounded-sm p-8">
            <h3 className="text-xl font-light mb-8 tracking-wide">ASSESSMENT</h3>
            
            {/* Match Score */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-light tracking-wide">MATCH SCORE</span>
                <span className="text-3xl font-thin">{analysis.matchScore}%</span>
              </div>
              <div className="w-full bg-gray-800 h-1">
                <div 
                  className="bg-white h-1 transition-all duration-1000"
                  style={{ width: `${analysis.matchScore}%` }}
                ></div>
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-8">
              <h4 className="font-light mb-4 flex items-center tracking-wide">
                <CheckCircle size={16} className="mr-2" />
                STRENGTHS
              </h4>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <Star size={12} className="text-white mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-light">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="mb-8">
              <h4 className="font-light mb-4 flex items-center tracking-wide">
                <AlertCircle size={16} className="mr-2" />
                IMPROVEMENTS
              </h4>
              <ul className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle size={12} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-light">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            <div>
              <h4 className="font-light mb-4 tracking-wide">MISSING SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill, index) => (
                  <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 text-xs font-light tracking-wide border border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interview Questions */}
          <div className="bg-gray-900 border border-gray-800 rounded-sm p-8">
            <h3 className="text-xl font-light mb-8 tracking-wide">INTERVIEW PREPARATION</h3>
            <div className="space-y-6">
              {analysis.interviewQuestions.map((qa, index) => (
                <div key={index} className="border-l border-gray-700 pl-4">
                  <h4 className="font-light text-white mb-3 text-sm tracking-wide">
                    Q{index + 1}: {qa.question}
                  </h4>
                  <p className="text-xs text-gray-400 bg-gray-800 p-4 font-light leading-relaxed">
                    {qa.suggestedAnswer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;