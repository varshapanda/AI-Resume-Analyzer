import React, { useState } from 'react';
import AnalyzePage from './components/AnalyzePage';
import ResultsPage from './components/ResultsPage';

const App = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState('analyze'); // 'analyze' or 'results'

  return (
    <>
      {currentPage === 'analyze' ? (
        <AnalyzePage
          resumeText={resumeText}
          setResumeText={setResumeText}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          setAnalysis={setAnalysis}
          loading={loading}
          setLoading={setLoading}
          uploading={uploading}
          setUploading={setUploading}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <ResultsPage
          analysis={analysis}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default App;