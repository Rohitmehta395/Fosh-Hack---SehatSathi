import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportHeader from "../components/sections/Report/ReportHeader";
import FilePreview from "../components/sections/Report/FilePreview";
import AnalyzeAction from "../components/sections/Report/AnalyzeAction";
import Dropzone from "../components/sections/Report/Dropzone";
import { Url } from "../components/api/Url";
import { Loader2 } from "lucide-react";

const Report = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(Url + "/report/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server error");
      }

      if (data.success) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            await fetch(Url + "/history/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                fileName: file.name,
                result: data.data,
              }),
            });
          } catch {
          }
        }

        navigate("/response", {
          state: { result: data.data, fileName: file.name },
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || "Something went wrong connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <ReportHeader />

        <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white p-6 sm:p-10 transition-all duration-500">
          <div className="mb-8">
            {!file ? (
              <Dropzone onFileSelect={handleFileSelect} />
            ) : (
              <FilePreview file={file} onRemove={handleRemoveFile} />
            )}
          </div>

          <div className="flex flex-col items-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 animate-pulse"></div>
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
                </div>
                <div className="text-center">
                  <p className="text-blue-600 font-bold text-lg">
                    Analyzing Document...
                  </p>
                  <p className="text-slate-500 text-sm mt-1 animate-pulse">
                    Our AI is reading the medical terminology
                  </p>
                </div>
              </div>
            ) : (
              <AnalyzeAction file={file} onAnalyze={handleAnalyze} />
            )}

            {error && (
              <div className="mt-6 w-full p-4 rounded-xl bg-red-50 border border-red-100 text-center animate-in fade-in slide-in-from-bottom-2">
                <p className="text-red-600 font-medium text-sm flex items-center justify-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    !
                  </span>
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
