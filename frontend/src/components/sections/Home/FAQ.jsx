import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is my health data safe and private?",
      answer:
        "Absolutely. We use bank-level encryption to process your files. Your reports are never stored on our servers, and they are permanently deleted immediately after the AI generates your explanation.",
    },
    {
      question: "Does this replace my doctor?",
      answer:
        "No. Our tool is designed to help you understand medical terminology and give you a baseline understanding of your results. It does not provide medical diagnoses or advice. Always consult your doctor for medical decisions.",
    },
    {
      question: "What types of reports can I upload?",
      answer:
        "You can upload standard blood tests, metabolic panels, lipid panels, and urinalysis reports. We accept PDF files as well as clear photos (JPG/PNG) of your printed reports.",
    },
    {
      question: "How accurate is the AI translation?",
      answer:
        "Our AI is trained specifically on medical literature to ensure high accuracy in defining terms and flagging out-of-range metrics. However, it's meant for educational purposes to help you ask your doctor the right questions.",
    },
    {
      question: "Is this service really free?",
      answer:
        "Yes! The core analysis tool is completely free to use. We believe everyone deserves to understand their own health data without barriers.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about how our tool works and keeps you
            safe.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-colors duration-300 ${
                openIndex === index
                  ? "border-blue-600 bg-blue-50/30"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
              >
                <span
                  className={`text-left font-semibold text-lg ${openIndex === index ? "text-blue-700" : "text-gray-900"}`}
                >
                  {faq.question}
                </span>
                <span
                  className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-blue-600" : "text-gray-400"}`}
                >
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
