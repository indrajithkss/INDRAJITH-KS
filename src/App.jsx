import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import Loader from "./components/Loader";
import SpotlightScene from "./components/SpotlightScene";
import Lenis from "lenis";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-dark-void text-white font-sans antialiased overflow-x-hidden selection:bg-neon-pink/30 selection:text-white">
      {/* Premium Loader screen overlay */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Page content wrapper with opacity transition to prevent layout flashes during load */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* R3F Interactive Spotlight background scene */}
        {!isLoading && <SpotlightScene />}

        {/* Navigation Header */}
        <Navbar isLoading={isLoading} />

        {/* Main Page Layout Container */}
        <main className="relative z-10 w-full">
          {/* Home / Hero Section */}
          <Hero isLoading={isLoading} />

          {/* Section Divider Line */}
          <div className="max-w-[1700px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* About Me Section */}
          <About />

          {/* Section Divider Line */}
          <div className="max-w-[1700px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Skills Section */}
          <Skills />

          {/* Section Divider Line */}
          <div className="max-w-[1700px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Projects Section */}
          <Projects />

          {/* Statistics Metric Section */}
          <Stats />

          {/* Section Divider Line */}
          <div className="max-w-[1700px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Achievements Section */}
          <Achievements />

          {/* Section Divider Line */}
          <div className="max-w-[1700px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Certifications Section */}
          <Certifications />
        </main>

        {/* Footer Branding */}
        <Footer />

        {/* Floating AI Chatbot Assistant */}
        <AIChatbot />
      </div>
    </div>
  );
}
