import React, { useState, useRef } from "react";
import { UploadCloud, FileType2 } from "lucide-react";

const Dropzone = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (file) => {
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF, JPG, or PNG file.");
      return;
    }
    if (file.size > maxSize) {
      alert("File size must be less than 10MB.");
      return;
    }
    onFileSelect(file);
  };

  return (
    <div
      className={`relative group border-2 border-dashed rounded-3xl p-10 sm:p-14 text-center transition-all duration-300 ease-in-out cursor-pointer ${
        isDragging
          ? "border-blue-500 bg-blue-50 shadow-inner scale-[0.99]"
          : "border-slate-300 bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".pdf, .jpg, .jpeg, .png, .webp"
        className="hidden"
      />

      <div
        className={`mx-auto w-20 h-20 mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${isDragging ? "bg-blue-600 text-white scale-110" : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"}`}
      >
        <UploadCloud size={40} className={isDragging ? "animate-bounce" : ""} />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3">
        {isDragging ? "Drop your file here!" : "Click or drag file to upload"}
      </h3>

      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium">
        <FileType2 size={16} />
        <p>Supports PDF, JPG, PNG (Max 10MB)</p>
      </div>
    </div>
  );
};

export default Dropzone;
