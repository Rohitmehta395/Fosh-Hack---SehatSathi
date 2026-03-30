import React from "react";
import { FileText, X, CheckCircle2 } from "lucide-react";

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-md animate-in fade-in zoom-in-95">
      <div className="flex items-center w-full sm:w-auto overflow-hidden">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mr-4 shrink-0 relative">
          <FileText size={28} />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
        </div>

        <div className="overflow-hidden text-left flex-1 min-w-0">
          <h4 className="font-bold text-slate-800 truncate">{file.name}</h4>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
          </p>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="shrink-0 flex items-center gap-2 text-slate-400 hover:text-red-500 hover:bg-red-50 font-medium text-sm transition-colors px-4 py-2 rounded-xl"
      >
        <X size={18} />
        Remove
      </button>
    </div>
  );
};

export default FilePreview;
