import React from "react";

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="overflow-hidden text-left">
          <h4 className="font-semibold text-gray-900 truncate max-w-[200px] md:max-w-xs">
            {file.name}
          </h4>
          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors px-4 py-2 hover:bg-red-50 rounded-lg"
      >
        Remove
      </button>
    </div>
  );
};

export default FilePreview;
