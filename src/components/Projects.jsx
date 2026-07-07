import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.documentElement.classList.add("modal-open");
      if (window.lenis) window.lenis.stop();
    } else {
      document.documentElement.classList.remove("modal-open");
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.documentElement.classList.remove("modal-open");
      if (window.lenis) window.lenis.start();
    };
  }, [selectedProject]);

  // Swipe gesture tracking state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const projectsData = [
    {
      title: "TRIPMIND",
      tagline: "AI-Driven Smart Travel Planner",
      description: "An AI-powered smart travel application that automatically generates comprehensive, personalized travel itineraries based on user preferences. Built with user authentication, custom search filters, and intelligent recommendations via OpenAI API integrations.",
      image: "/assets/projects/tripmind.png",
      tags: ["React Native", "Node.js", "Express", "MongoDB", "OpenAI API"],
      brandColor: "#00f0ff", // Neon Cyan
      codeLink: "https://github.com/indrajithkss/TripMind",
      demoLink: "#",
      details: [
        "Developed a full-stack travel planning application using React Native, Node.js, Express.js, and MongoDB.",
        "Designed and consumed RESTful APIs for user authentication, trip management, itinerary generation, and recommendations.",
        "Implemented JWT-based authentication and authorization for secure user access.",
        "Optimized MongoDB queries to improve backend performance and response times.",
        "Integrated OpenAI API for AI-powered itinerary generation and travel recommendations.",
        "Utilized Git and GitHub for version control and collaborative development.",
        "Applied modular application architecture principles for scalability and maintainability."
      ]
    },
    {
      title: "SHIELD-X",
      tagline: "IoT Wearable Smart Safety Jacket",
      description: "An advanced IoT safety jacket designed for industrial workers. Features real-time GPS tracking, fall/accident detection sensors, secure cloud syncing with Firebase, and instant push notification alerts built with Flutter.",
      image: "/assets/projects/shieldx.png",
      tags: ["ESP32", "Embedded C++", "Firebase IoT", "Flutter", "GPS"],
      brandColor: "#ff007f", // Neon Pink
      codeLink: "https://github.com/indrajithkss/shieldx-app",
      demoLink: "#",
      details: [
        "Built an IoT-enabled wearable system for real-time rider monitoring and accident detection.",
        "Implemented sensor data processing using accelerometer and gyroscope data with threshold-based logic to reduce false positives.",
        "Developed a real-time data pipeline using ESP32 and Firebase IoT Cloud for remote monitoring and alert generation.",
        "Built a Flutter-based mobile app for live sensor data visualization, GPS tracking, and emergency notifications.",
        "Designed an SOS alert system to transmit real-time location data to predefined contacts during emergencies.",
        "Developed REST-based communication between mobile application and cloud services."
      ]
    },
   
    {
      title: "PAWAMIGO",
      tagline: "Android Pet Social Network",
      description: "PawAmigo is a feature-rich mobile application designed to simplify pet care through intelligent health tracking, pet profile management, community networking, and location-based pet service discovery. Built with Kotlin and Firebase, it delivers a seamless and user-friendly experience for modern pet owners.",
      image: "/assets/projects/pawamigo.png",
      tags: ["Kotlin", "Android SDK", "Firebase", "Glide", "Google Maps"],
      brandColor: "#ff9f1c", // Orange/Yellow
      codeLink: "https://github.com/indrajithkss/PawAmigo",
      demoLink: "#",
      details: [
        "Developed an Android app enabling pet registration, scheduling, and nearby user discovery.",
        "Implemented Firebase Authentication and Cloud Firestore for real-time sync and secure access.",
        "Improved UI performance using Recycler View and optimized image loading with Glide."
      ]
    },
    {
      title: "JOBSCOUT AI",
      tagline: "AI-Powered Full-Stack Career Assistant",
      description: "A full-stack AI career assistant designed to simplify the job search. It discovers relevant job opportunities, analyzes resume compatibility, recommends skills to learn, and manages applications through a modern dashboard.",
      image: "/assets/projects/jobscout-ai.png",
      tags: ["React.js", "Node.js", "Express", "Supabase", "Gemini AI"],
      brandColor: "#10a37f", // Green
      codeLink: "https://github.com/indrajithkss/jobscout-ai",
      demoLink: "#",
      details: [
        "Developed a full-stack AI career assistant utilizing React, Node.js, Express.js, and Supabase.",
        "Integrated Google Gemini API for resume parsing, skill gap analysis, and tailored interview preparation topics.",
        "Built an interactive analytics dashboard displaying career readiness scores and pipeline metrics.",
        "Automated daily job discovery and scout execution using GitHub Actions."
      ]
    },
   
    {
      title: "SIJI JOB CONSULTANCY",
      tagline: "Full-Stack Workforce Management Platform",
      description: "A comprehensive recruitment management system connecting workers, employers, and administrators. Features multi-role dashboards, automated placement workflows, secure document verification via Cloudinary, and analytics.",
      image: "/assets/projects/siji-consultancy.png",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Cloudinary", "JWT"],
      brandColor: "#ffaa00", // Vibrant Orange
      codeLink: "https://github.com/indrajithkss/siji-job-consultancy",
      demoLink: "https://siji-job-consultancy.vercel.app/",
      details: [
        "Developed a full-stack recruitment platform using React.js, Express, and MongoDB Atlas.",
        "Designed multi-role dashboards for Workers (profile upload), Employers (posting requirements), and Admins (placement verification).",
        "Implemented secure JWT-based authentication, role-based authorization, and bcrypt password hashing.",
        "Integrated Cloudinary SDK for secure, automated worker identity document uploads and cloud storage.",
        "Built an automated placement workflow with system alerts and real-time database updates."
      ]
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  // Autoplay cylinder rotation
  useEffect(() => {
    if (selectedProject) return; // Freeze autoplay if modal is open
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoplay, selectedProject]);

  // GSAP scroll trigger for header and viewport entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        ".projects-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out"
        }
      )
      .fromTo(
        ".cylinder-viewport",
        { opacity: 0, y: 60, scale: 0.9, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.4,
          ease: "power4.out"
        },
        "-=0.65"
      )
      .fromTo(
        ".carousel-indicator-dots",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Touch Swipe Handlers for mobile navigation
  const handleTouchStart = (e) => {
    setIsAutoplay(false);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    // reset tracking values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Helper to determine pseudo 3D styles for each card dynamically
  const getCardStyle = (idx) => {
    let diff = idx - activeIndex;
    if (diff < -projectsData.length / 2) diff += projectsData.length;
    if (diff > projectsData.length / 2) diff -= projectsData.length;

    const isActive = diff === 0;
    const isRight = diff === 1;
    const isLeft = diff === -1;

    let transform = "";
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents = "none";

    if (isActive) {
      // Identity 2D transform triggers native font vector crispness
      transform = "translateX(0px) scale(1) rotateY(0deg)";
      opacity = 1;
      zIndex = 30;
      pointerEvents = "auto";
    } else if (isRight) {
      transform = "translateX(var(--offset-x)) scale(0.68) rotateY(-25deg)";
      opacity = 0.25;
      zIndex = 10;
    } else if (isLeft) {
      transform = "translateX(calc(-1 * var(--offset-x))) scale(0.68) rotateY(25deg)";
      opacity = 0.25;
      zIndex = 10;
    } else {
      transform = `translateX(${diff > 0 ? "calc(1.8 * var(--offset-x))" : "calc(-1.8 * var(--offset-x))"}) scale(0.7) rotateY(0deg)`;
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform,
      opacity,
      zIndex,
      pointerEvents,
      transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease"
    };
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-b border-white/5 animate-section"
    >
      {/* Hardware-Accelerated 3D Cylinder Styles */}
      <style>{`
        .cylinder-viewport {
          perspective: 1000px;
          perspective-origin: 50% 50%;
        }
        .cylinder-container {
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
          --offset-x: 120px;
        }
        @media (min-width: 360px) {
          .cylinder-container {
            --offset-x: 155px;
          }
        }
        @media (min-width: 480px) {
          .cylinder-container {
            --offset-x: 210px;
          }
        }
        @media (min-width: 640px) {
          .cylinder-container {
            --offset-x: 340px;
          }
        }
        @media (min-width: 1024px) {
          .cylinder-container {
            --offset-x: 410px;
          }
        }
        .cylinder-card {
          position: absolute;
          width: 290px;
          height: 220px;
          left: 50%;
          top: 50%;
          margin-left: -145px;
          margin-top: -110px;
          transform-style: preserve-3d;
          /* Optimized crisp font properties */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        @media (min-width: 360px) {
          .cylinder-card {
            width: 325px;
            height: 245px;
            margin-left: -162.5px;
            margin-top: -122.5px;
          }
        }
        @media (min-width: 480px) {
          .cylinder-card {
            width: 380px;
            height: 260px;
            margin-left: -190px;
            margin-top: -130px;
          }
        }
        @media (min-width: 640px) {
          .cylinder-card {
            width: 600px;
            height: 360px;
            margin-left: -300px;
            margin-top: -180px;
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
        }
        .custom-scrollbar {
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Soft white overhead glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07)_0%,transparent_60%)] pointer-events-none -z-10" />

      {/* Background Neon Lights */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-neon-pink/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 xl:px-16 space-y-12">

        {/* Section Title Header */}
        <div className="projects-header text-center space-y-2">
          <span className="text-xs font-semibold tracking-[0.25em] text-neon-pink uppercase block">
            Featured Projects
          </span>
          <h2 className="text-4xl font-display font-extrabold text-white tracking-tight leading-none">
            Some Things I've Built
          </h2>
        </div>

        {/* 3D Cylinder Rotating Carousel Area */}
        <div
          className="relative max-w-5xl mx-auto h-[295px] sm:h-[420px] flex items-center justify-center cylinder-viewport overflow-visible mt-8"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* Cylinder Axis Container */}
          <div className="w-full h-full cylinder-container flex items-center justify-center">
            {projectsData.map((project, idx) => {
              const style = getCardStyle(idx);
              const isActive = activeIndex === idx;

              return (
                <div
                  key={idx}
                  className="cylinder-card"
                  style={style}
                >
                  <TiltCard
                    maxTilt={isActive ? 3.5 : 0}
                    className="w-full h-full shadow-2xl rounded-3xl"
                    onClick={(e) => {
                      if (isActive) {
                        // Prevent opening if the click targets an anchor tag link
                        if (e.target.closest("a")) return;
                        setSelectedProject(project);
                      }
                    }}
                  >
                    <div
                      className="w-full h-full rounded-3xl border border-white/15 bg-zinc-950/95 overflow-hidden grid grid-cols-12 relative group/card transition-all duration-300"
                      style={{
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -3px 8px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {/* Top diagonal glare sheen reflection */}
                      <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-3xl z-10" />

                      {/* Left: Image Frame */}
                      <div className="col-span-5 h-full w-full overflow-hidden relative border-r border-white/5 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-85 z-10" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-left group-hover/card:scale-105 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"; // fallback
                          }}
                        />
                        <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-full border border-white/10 bg-black/45 backdrop-blur-md text-[7px] font-mono font-bold tracking-widest text-white uppercase select-none">
                          Project 0{idx + 1}
                        </div>
                      </div>

                      {/* Right: Text & Badges */}
                      <div className="col-span-7 p-4 sm:p-5 flex flex-col justify-between h-full space-y-2 overflow-hidden z-20 relative">
                        <div className="space-y-1">
                          <div className="space-y-0.5">
                            <h3 className="text-sm sm:text-base font-display font-extrabold text-white tracking-tight uppercase leading-tight">
                              {project.title}
                            </h3>
                            <p className="text-[7px] sm:text-[8px] font-mono font-bold uppercase tracking-widest leading-none font-semibold" style={{ color: project.brandColor }}>
                              {project.tagline}
                            </p>
                          </div>
                          <p className="text-zinc-200 text-[10px] sm:text-xs font-sans font-normal leading-relaxed pt-0.5">
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {/* Tech Badges */}
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, tagIdx) => (
                              <span
                                key={tagIdx}
                                className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/15 font-mono text-[7.5px] sm:text-[9px] font-bold text-zinc-300 select-none"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Links */}
                          <div className="flex items-center gap-3 pt-1.5 border-t border-white/10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className={`flex items-center gap-1.5 text-[9px] sm:text-xs font-mono text-neon-pink hover:text-white transition-colors duration-300 font-bold bg-white/[0.04] border border-white/10 hover:border-neon-pink/30 px-2 py-1 rounded ${isActive ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
                                }`}
                            >
                              <span>View Details</span>
                              <ArrowRight size={10} />
                            </button>
                            <a
                              href={project.codeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className={`flex items-center gap-1.5 text-[9px] sm:text-xs font-mono text-zinc-300 hover:text-white transition-colors duration-300 font-bold bg-white/[0.04] border border-white/10 hover:border-white/20 px-2 py-1 rounded ${isActive ? "pointer-events-auto" : "pointer-events-none"
                                }`}
                            >
                              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                              </svg>
                              <span>Source</span>
                            </a>
                            {project.demoLink && project.demoLink !== "#" && (
                              <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className={`flex items-center gap-1.5 text-[9px] sm:text-xs font-mono text-neon-cyan hover:text-white transition-colors duration-300 font-bold bg-white/[0.04] border border-white/10 hover:border-neon-cyan/30 px-2 py-1 rounded ${isActive ? "pointer-events-auto" : "pointer-events-none"
                                  }`}
                              >
                                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                <span>Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>

          {/* Decoupled Navigation Arrows */}
          <button
            onClick={() => {
              setIsAutoplay(false);
              prevSlide();
            }}
            className="absolute left-1 sm:left-[-45px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md hover:border-white/30 text-white hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 z-40"
            style={{
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => {
              setIsAutoplay(false);
              nextSlide();
            }}
            className="absolute right-1 sm:right-[-45px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md hover:border-white/30 text-white hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 z-40"
            style={{
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center items-center gap-2 pt-2 carousel-indicator-dots">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoplay(false);
                setActiveIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                  ? "bg-white w-6 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  : "bg-white/20 hover:bg-white/40 w-2.5"
                }`}
            />
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-6xl bg-zinc-950/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 transition-all duration-300 transform scale-100 grid grid-cols-1 md:grid-cols-12 h-[85vh] md:h-[500px]"
            style={{
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.15)",
            }}
          >
            {/* Left Column: Image Banner */}
            <div className="col-span-1 md:col-span-5 h-44 md:h-full relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10" />
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-left"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>

            {/* Right Column: Content & Actions */}
            <div className="col-span-1 md:col-span-7 p-4 sm:p-5 flex flex-col justify-between h-[calc(85vh-176px)] md:h-full overflow-hidden relative">
              {/* Close Button floating top-right */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/15 bg-black/50 hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300"
              >
                ✕
              </button>

              {/* Scrollable Contents */}
              <div
                data-lenis-prevent
                className="space-y-4 overflow-y-auto custom-scrollbar flex-grow text-left pr-1 md:pr-2 pt-2 md:pt-4"
              >
                <div className="space-y-1 pb-1">
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight uppercase leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p
                    className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest leading-none"
                    style={{ color: selectedProject.brandColor }}
                  >
                    {selectedProject.tagline}
                  </p>
                </div>

                {/* About Project Glass Panel */}
                <div
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden space-y-1.5"
                  style={{
                    boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                  <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    About Project
                  </h4>
                  <p className="text-zinc-300 text-xs sm:text-[13px] font-sans font-normal leading-relaxed relative z-10">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Features Glass Panel */}
                {selectedProject.details && selectedProject.details.length > 0 && (
                  <div
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden space-y-2.5"
                    style={{
                      boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                    <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                      Key Features & Implementations
                    </h4>
                    <ul className="space-y-2 relative z-10">
                      {selectedProject.details.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-2.5 items-start text-zinc-300 text-xs sm:text-[13px] leading-relaxed">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: selectedProject.brandColor }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Used Glass Panel */}
                <div
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden space-y-2.5"
                  style={{
                    boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                  <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {selectedProject.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 font-mono text-[8px] sm:text-[10px] font-bold text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-3 border-t border-white/10 bg-transparent flex items-center justify-end gap-3 flex-shrink-0 mt-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-3.5 py-1.5 rounded border border-white/15 bg-transparent hover:bg-white/[0.03] text-zinc-400 hover:text-white transition-all duration-300 font-mono text-[10px] sm:text-xs font-bold"
                >
                  Close
                </button>
                <a
                  href={selectedProject.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3.5 py-1.5 rounded border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-white transition-all duration-300 font-mono text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>Source Code</span>
                  <ArrowRight size={10} />
                </a>
                {selectedProject.demoLink && selectedProject.demoLink !== "#" && (
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3.5 py-1.5 rounded border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-neon-cyan/30 text-neon-cyan hover:text-white transition-all duration-300 font-mono text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Live Demo</span>
                    <ArrowRight size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
