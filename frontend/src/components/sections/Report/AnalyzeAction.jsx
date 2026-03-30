import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

const AnalyzeAction = ({ file, onAnalyze }) => {
  return (
    <div className="w-full text-center mt-2">
      <button
        onClick={onAnalyze}
        disabled={!file}
        className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden ${
          file
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        {file && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
        )}

        <Sparkles
          size={22}
          className={file ? "text-blue-200" : "text-slate-300"}
        />
        <span>Analyze My Report</span>
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
        <ShieldCheck size={18} className="text-emerald-500" />
        <span>Bank-level encryption. Files are automatically deleted.</span>
      </div>
    </div>
  );
};

export default AnalyzeAction;
