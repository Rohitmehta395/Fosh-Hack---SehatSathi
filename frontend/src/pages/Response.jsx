import React, { useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Printer, ArrowLeft, FileText, Activity, Globe } from "lucide-react";

const Response = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, fileName } = location.state || {};
  const reportRef = useRef(null);

  const [activeLangIndex, setActiveLangIndex] = useState(0);

  const parsedLanguages = useMemo(() => {
    if (!result) return [];

    let cleanResult = result.replace(/---/g, "");

    cleanResult = cleanResult.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, "");
    cleanResult = cleanResult.replace(/[\u{1F300}-\u{1F9FF}]/gu, "");
    cleanResult = cleanResult.replace(/\*/g, "");
    cleanResult = cleanResult.replace(/^(?:\d+\.\s*)/gm, "## ");

    const firstHeadingIndex = cleanResult.indexOf("## ");
    if (firstHeadingIndex !== -1) {
      cleanResult = cleanResult.substring(firstHeadingIndex);
    }

    const sections = cleanResult
      .split(/^##\s+/m)
      .filter((s) => s.trim() !== "");

    if (sections.length === 0) {
      return [{ title: "English", content: cleanResult }];
    }

    return sections.map((section, index) => {
      const lines = section.trim().split("\n");

      let titleText = lines[0].replace(/#/g, "").trim();
      titleText = titleText.replace(/Analysis|विश्लेषण/gi, "").trim();

      if (!titleText) {
        titleText =
          index === 0 ? "English" : index === 1 ? "Hindi" : "Hinglish";
      }

      let contentBody = lines.slice(1).join("\n").trim();

      contentBody = contentBody.replace(
        /^(?:###\s*)?(English|Hindi|Hinglish)\s+Report\s*/gim,
        "",
      );

      contentBody = contentBody.replace(
        /^(?:###\s*)?(?:👤\s*)?(Patient Details|मरीज का विवरण|मरीज़ का विवरण|रोगी का विवरण|Mareez ki Details)\s*:?/gim,
        '<h3 class="text-center font-semibold text-3xl text-slate-800 mb-8 mt-4">👤 $1</h3>',
      );

      contentBody = contentBody.replace(
        /(?:^|\n)[\s-]*(Name|नाम|Naam)\s*:\s*([^\n]+)[\s\n]+[\s-]*(Age.*?|उम्र.*?|आयु.*?|Umar.*?)\s*:\s*([^\n]+)/gi,
        '\n<div class="flex flex-wrap justify-center w-full gap-6 mb-16">\n  <div class="bg-indigo-50 border border-indigo-200 text-indigo-900 px-8 py-4 rounded-2xl shadow-sm font-bold tracking-wide text-lg">$1: <span class="font-semibold text-indigo-600">$2</span></div>\n  <div class="bg-indigo-50 border border-indigo-200 text-indigo-900 px-8 py-4 rounded-2xl shadow-sm font-bold tracking-wide text-lg">$3: <span class="font-semibold text-indigo-600">$4</span></div>\n</div>\n',
      );

      contentBody = contentBody.replace(
        /^(?:###\s*)?(?:🩺\s*)?(Key Findings|मुख्य निष्कर्ष|Mukhya Nishkarsh)\s*:?/gim,
        '<h3 class="font-semibold text-2xl text-slate-800 mt-10 mb-6 border-b-2 border-slate-100 pb-3">🩺 $1</h3>',
      );

      contentBody = contentBody.replace(
        /^(?:###\s*)?(?:💡\s*)?(Summary & Next Steps|Summary|सारांश|Saaransh)\s*:?/gim,
        '<h3 class="font-semibold text-2xl text-slate-800 mt-14 mb-4 border-b-2 border-slate-100 pb-3">💡 $1</h3>',
      );

      contentBody = contentBody.replace(
        /\((High|Slightly High|Elevated|Critical|Severe|उच्च|थोड़ा उच्च)\)/gi,
        ' <span class="text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-lg text-sm font-bold shadow-sm mx-1">$1</span> ',
      );

      contentBody = contentBody.replace(
        /\((Low|Slightly Low|Borderline|कम|थोड़ा कम)\)/gi,
        ' <span class="text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-lg text-sm font-bold shadow-sm mx-1">$1</span> ',
      );

      contentBody = contentBody.replace(
        /\((Normal|Good|Healthy|सामान्य|स्वस्थ)\)/gi,
        ' <span class="text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-lg text-sm font-bold shadow-sm mx-1">$1</span> ',
      );

      return {
        title: titleText,
        content: contentBody,
      };
    });
  }, [result]);

  const handlePrint = () => {
    window.print();
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            No Report Found
          </h2>
          <p className="text-slate-500 mb-8">
            It looks like you haven't uploaded a report for analysis yet.
          </p>
          <button
            onClick={() => navigate("/report")}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-md shadow-blue-200"
          >
            <ArrowLeft size={20} />
            Go Upload a Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => navigate("/report")}
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-blue-200"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Analyze New Report
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Save as PDF / Print</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>

        <div
          ref={reportRef}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-10 text-white shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Activity className="text-white" size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                AI Analysis Results
              </h1>
            </div>
            {fileName && (
              <p className="text-blue-100 flex items-center gap-2 font-medium opacity-90">
                <FileText size={16} />
                Source File: {fileName}
              </p>
            )}
          </div>

          {parsedLanguages.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 p-4 sm:px-10 bg-slate-50 border-b border-slate-200 print:hidden shrink-0">
              <div className="flex items-center gap-2 text-slate-500 mr-2 font-medium text-sm">
                <Globe size={18} />
                <span>Language:</span>
              </div>

              {parsedLanguages.map((lang, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLangIndex(index)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeLangIndex === index
                      ? "bg-blue-100 text-blue-700 shadow-sm border border-blue-200 scale-105"
                      : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  {lang.title}
                </button>
              ))}
            </div>
          )}

          <div className="p-8 sm:p-10 md:p-12 grow">
            <div
              className="prose prose-slate max-w-none 
                          prose-headings:font-bold prose-headings:text-slate-800 
                          prose-h1:text-3xl prose-h2:text-2xl prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                          prose-h3:text-xl prose-h3:text-blue-800
                          prose-p:text-slate-600 prose-p:leading-relaxed
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-slate-900 prose-strong:font-semibold
                          prose-ul:list-disc prose-ul:pl-5
                          prose-li:text-slate-600 prose-li:marker:text-blue-500
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-slate-700
                          "
            >
              {parsedLanguages.length > 0 ? (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {parsedLanguages[activeLangIndex].content}
                </ReactMarkdown>
              ) : (
                <p>Formatting error. Please try analyzing again.</p>
              )}
            </div>

            <div className="mt-12 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <span className="text-amber-500 text-xl">⚠️</span>
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong className="block mb-1">Medical Disclaimer</strong>
                This analysis is generated by AI to help you understand medical
                terminology. It is <strong>not</strong> a substitute for
                professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center print:hidden">
          <p className="text-slate-500 mb-5 font-medium text-lg">
            Want to analyze another report?
          </p>
          <button
            onClick={() => navigate("/report")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
          >
            Upload New Report
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body { background-color: white !important; }
          header, nav, button, .print\\:hidden { display: none !important; }
          .min-h-screen { padding: 0 !important; pt: 0 !important; }
          .max-w-4xl { max-width: 100% !important; margin: 0 !important; }
          .shadow-xl { box-shadow: none !important; border: 1px solid #e2e8f0 !important; }
        }
      `,
        }}
      />
    </div>
  );
};

export default Response;
