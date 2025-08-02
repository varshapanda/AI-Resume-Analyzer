import React from "react";
import { analyzeResume } from "../services/api";
import ResumeInput from "./ResumeInput";
import JobDescriptionInput from "./JobDescriptionInput";

const AnalyzePage = ({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  setAnalysis,
  loading,
  setLoading,
  uploading,
  setUploading,
  setCurrentPage,
}) => {
  const handleAnalyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please fill in both resume and job description");
      return;
    }

    setLoading(true);

    try {
      const analysisResult = await analyzeResume(resumeText, jobDescription);
      setAnalysis(analysisResult);
      setCurrentPage("results"); // Navigate to results page
    } catch (error) {
      console.error("Error:", error);
      alert("Error analyzing resume. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-thin text-white mb-2 tracking-wide">
            AI RESUME ANALYZER
          </h1>
          <p className="text-gray-400 font-light">
            Analysis for professional excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Resume Input */}
          <ResumeInput
            resumeText={resumeText}
            setResumeText={setResumeText}
            uploading={uploading}
            setUploading={setUploading}
          />

          {/* Job Description Input */}
          <JobDescriptionInput
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />
        </div>

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={handleAnalyzeResume}
            disabled={loading || uploading}
            className="bg-white text-black px-12 py-3 font-light tracking-widest hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {loading ? "ANALYZING..." : uploading ? "PROCESSING..." : "ANALYZE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
