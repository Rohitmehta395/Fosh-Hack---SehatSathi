import React from "react";
import { FileSearch } from "lucide-react";

const ReportHeader = () => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 shadow-inner">
        <FileSearch size={32} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Upload Your Lab Report
      </h1>
      <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
        Let our AI break down complex medical terminology into a simple,
        easy-to-understand summary.
      </p>
    </div>
  );
};

export default ReportHeader;
