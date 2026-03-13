import React, { useState } from "react";
import ReportHeader from "../components/sections/Report/ReportHeader";
import FilePreview from "../components/sections/Report/FilePreview";
import AnalyzeAction from "../components/sections/Report/AnalyzeAction";
import Dropzone from "../components/sections/Report/Dropzone";

const Report = () => {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => setFile(selectedFile);
  const handleRemoveFile = () => setFile(null);

  const handleAnalyze = () => {
    if (!file) return;
    alert(`Starting analysis for: ${file.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <ReportHeader />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          {!file ? (
            <Dropzone onFileSelect={handleFileSelect} />
          ) : (
            <FilePreview file={file} onRemove={handleRemoveFile} />
          )}

          <AnalyzeAction file={file} onAnalyze={handleAnalyze} />
        </div>
      </div>
    </div>
  );
};

export default Report;
