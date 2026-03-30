import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Upload your report",
      description:
        "Securely upload your lab results as a PDF, photo, or scan. Your data is encrypted and private.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
    },
    {
      id: "02",
      title: "We analyze the jargon",
      description:
        "Our smart system scans the complex medical terms, numbers, and flags in seconds.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "03",
      title: "Get clear answers",
      description:
        "Read a simple, easy-to-understand breakdown of your health in your native language.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How it works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get clarity on your health in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-sm font-bold text-blue-200">
                  {step.id}.
                </span>
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
