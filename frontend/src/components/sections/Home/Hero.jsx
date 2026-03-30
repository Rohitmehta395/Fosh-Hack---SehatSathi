import React from "react";
import heroImage from "../../../assets/Home/HeroImage.webp";
import HeroImageMobile from "../../../assets/Home/HeroImageMobile.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-100">
      {/* --- Mobile Background Image --- */}
      <div
        className="absolute inset-0 z-0 md:hidden"
        style={{
          backgroundImage: `url(${HeroImageMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* --- Desktop Background Image --- */}
      <div
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Gradient Overlay */}
      {/* Mobile uses a vertical gradient, Desktop explicitly resets to a horizontal gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/60"></div>

      {/* Main Content */}
      {/* MOBILE: flex-col, justify-end (pushes to bottom), items-center, with pb-16 to keep it off the very edge */}
      {/* DESKTOP: flex-row, items-center (middle), justify-start, removes bottom padding */}
      <div className="relative z-10 container mx-auto h-full min-h-screen flex flex-col justify-end items-center pb-16 md:flex-row md:items-center md:justify-start md:pb-0 px-6 md:px-12">
        <div className="max-w-lg w-full flex flex-col items-center text-center md:items-start md:text-left mt-0 md:mt-52">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Understanding your reports <br />
            <span className="text-blue-600">made simpler.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
            Upload your lab report and get instant, easy-to-understand
            explanations in your language.
          </p>

          <div className="mt-10 flex flex-col items-center md:items-start w-full">
            <button
              onClick={() => navigate("/report")}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg"
            >
              Analyze Your Report
            </button>
            <p className="mt-3 text-sm text-gray-700 md:text-gray-600 ml-0 md:ml-4 font-medium">
              Free to use • Secure & Private
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
