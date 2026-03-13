import React from "react";

const AnalyzeAction = ({ file, onAnalyze }) => {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={onAnalyze}
        disabled={!file}
        className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
          file
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Analyze My Report
      </button>

      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <svg
          className="w-4 h-4 mr-2 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>
          Bank-level encryption. Your files are automatically deleted after
          analysis.
        </span>
      </div>
    </div>
  );
};

export default AnalyzeAction;
