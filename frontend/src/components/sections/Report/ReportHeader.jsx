import React from "react";

const ReportHeader = () => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Upload Your Lab Report
      </h1>
      <p className="text-lg text-gray-600">
        Our AI will analyze your medical terminology and provide a simple,
        easy-to-understand summary.
      </p>
    </div>
  );
};

export default ReportHeader;
