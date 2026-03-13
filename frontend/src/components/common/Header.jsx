import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeSolid = !isHomePage || isScrolled || isOpen;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        shouldBeSolid ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${shouldBeSolid ? "py-3" : "py-5"}`}
        >
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-blue-600 tracking-wide"
            >
              LOGO
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <a
                href="/"
                className={`font-medium transition duration-300 ${
                  !shouldBeSolid
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                Home
              </a>
              <a
                href="/report"
                className={`font-medium transition duration-300 ${
                  !shouldBeSolid
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                Report
              </a>
              <a
                href="/history"
                className={`font-medium transition duration-300 ${
                  !shouldBeSolid
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                History
              </a>
            </nav>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-sm">
              Sign Up
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
          <a
            href="/"
            className="block text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md px-3 py-2 font-medium transition"
          >
            Home
          </a>
          <a
            href="/report"
            className="block text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md px-3 py-2 font-medium transition"
          >
            Report
          </a>
          <a
            href="/history"
            className="block text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md px-3 py-2 font-medium transition"
          >
            History
          </a>
          <div className="pt-2">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-sm">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
