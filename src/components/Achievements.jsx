import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Calendar, Users, ExternalLink, Award, FileText, Sparkles, Download, ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap";

export default function Achievements() {
  const [activeTab, setActiveTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTabStyle, setActiveTabStyle] = useState({ left: 0, width: 0 });

  const contentRef = useRef(null);
  const detailsRef = useRef(null);
  const tabRefs = useRef([]);

  const publications = [
    {
      title: "Artificial Intelligence in Auditing: Transforming the Future of Accounting",
      tagline: "Financial Anomaly Detection & ML Auditing Models",
      tabName: "AI in Auditing",
      type: "Journal Publication",
      journal: "International Journal of Innovative Research in Engineering and Management (IJIREM)",
      citation: "IJIREM, Vol-13, Issue-2, Page No-88-102, 2026",
      doi: "10.55524/ijirem.2026.13.2.13",
      doiUrl: "https://doi.org/10.55524/ijirem.2026.13.2.13",
      pdfUrl: "https://ijirem.org/DOC/1979_pdf.pdf",
      date: "April 2026",
      brandColor: "#ff9f1c", // Neon Pink (Orange)
      authors: ["Boomika G", "Mamdha Sri G", "Feon Jaison", "Indrajith K S", "Rohit Sonawane"],
      shortSummary: "A machine learning approach for automated anomaly detection in financial audits using Random Forest models, custom-designed to minimize fraud detection latency for small-to-medium enterprises.",
      abstract: "The increasing dependence of businesses on digital systems has contributed to an explosion in the number of financial transactions being carried out by organizations. This has necessitated a need to evolve auditing practices since the traditional methods have become obsolete due to their heavy dependence on manual testing and sampling. Thus, there is a need to adopt more efficient auditing processes. This research paper discusses the application of Artificial Intelligence (AI) to facilitate auditing. An intelligent system for analyzing anomalies using machine learning techniques like random forest is developed and applied to financial transactions. Transaction and behavioral data are used to detect any abnormal transactions. The model adopted is suitable for SMEs in India which lack access to sophisticated audit systems. The results obtained reveal that AI-based auditing processes help to minimize fraud detection time and improve the accuracy of the process. The system also facilitates continuous monitoring, which helps to mitigate potential risks early before they materialize. Overall, AI has helped to revolutionize auditing in order to cope with emerging digital financial trends.",
      details: [
        "Architected an intelligent financial anomaly analysis module utilizing Random Forest machine learning models.",
        "Created an end-to-end framework processing real-time transactional and behavioral audit data logs.",
        "Optimized processing overheads specifically for resource-constrained Indian SMEs.",
        "Demonstrated a reduction in fraud discovery intervals alongside heightened audit accuracy."
      ],
      tags: ["Artificial Intelligence", "Anomaly Detection", "Random Forest", "FinTech", "Digital Accounting"]
    },
    {
      title: "Edge Computing in Oceanographic Research and Marine Technology: Revolutionizing Real-Time Data Processing and Decision-Making",
      tagline: "Distributed Marine Sensors & Localized Telemetry Systems",
      tabName: "Marine Edge Computing",
      type: "Journal Publication",
      journal: "Irish Interdisciplinary Journal of Science & Research (IIJSR)",
      citation: "IIJSR, Vol-9, Issue-2, 2025",
      doi: "IIJSR-Vol9-Issue2",
      doiUrl: "https://iijsr.com/data/uploads/84361.pdf",
      pdfUrl: "https://iijsr.com/data/uploads/84361.pdf",
      date: "April-June 2025",
      brandColor: "#ffd166", // Neon Cyan (Yellow)
      authors: ["Dr. S.K. Manju Bargavi", "Ihsana S. Ibrahim", "Indrajith K.S.", "Faheem K."],
      shortSummary: "Proposes decentralized edge computing architectures for ocean buoys, marine sensors, and AUVs, enabling real-time localized data processing and telemetry optimization under extreme maritime conditions.",
      abstract: "Edge computing is fundamentally transforming oceanographic research and marine technology by enabling real-time data processing directly at the source—such as on buoys, sensors, and underwater vehicles—thereby overcoming the limitations of traditional cloud-based systems. Relying on centralized cloud servers in harsh oceanic conditions is often impractical due to limited, intermittent, or high-latency connectivity. Edge computing addresses these challenges by minimizing latency, optimizing bandwidth through local data filtering, and improving the autonomy of underwater vehicles. The paper also discusses applications in environmental monitoring, fisheries management, and maritime shipping, along with deployment challenges such as extreme environmental conditions, resource constraints, and physical/cybersecurity threats.",
      details: [
        "Formulated edge deployment strategies for real-time sensor processing directly on ocean buoys and AUVs.",
        "Successfully optimized telemetry bandwidth, reducing remote satellite communication packet size requirements by up to 70%.",
        "Examined real-world physical threats, including seawater biofouling, battery depletion, and high-pressure sensor conditions.",
        "Designed localized cryptographic authorization layers to prevent sensor network data tampering in deep-sea environments."
      ],
      tags: ["Edge Computing", "IoT Sensors", "Marine Technology", "Oceanographic Data"]
    }
  ];

  // Sliding active indicator pill alignment helper
  useEffect(() => {
    const updateTabStyle = () => {
      const activeTabEl = tabRefs.current[activeTab];
      const containerEl = activeTabEl?.parentElement;
      if (activeTabEl && containerEl) {
        const activeRect = activeTabEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        setActiveTabStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
        });
      }
    };

    updateTabStyle();
    window.addEventListener("resize", updateTabStyle);
    return () => window.removeEventListener("resize", updateTabStyle);
  }, [activeTab]);

  // Entrance scroll trigger animations via GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#achievements",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        ".achievements-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out"
        }
      ).fromTo(
        ".dashboard-tabs-container",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.6"
      ).fromTo(
        ".dashboard-viewport",
        { opacity: 0, y: 50, rotateX: 5 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out"
        },
        "-=0.6"
      );
    });

    return () => ctx.revert();
  }, []);

  // Smooth staggered viewport items animation on active tab changes
  useEffect(() => {
    setIsExpanded(false); // Reset expansion on tab change
    
    const ctx = gsap.context(() => {
      gsap.set(".animate-view-item", { opacity: 0, y: 15 });
      gsap.to(".animate-view-item", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out"
      });
    }, contentRef);

    return () => ctx.revert();
  }, [activeTab]);

  // Animate details expand/collapse with stagger
  useEffect(() => {
    if (detailsRef.current) {
      if (isExpanded) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            detailsRef.current,
            { height: 0, opacity: 0 },
            { height: "auto", opacity: 1, duration: 0.65, ease: "power3.out" }
          );

          gsap.set(".animate-drawer-item", { opacity: 0, y: 15 });
          gsap.to(".animate-drawer-item", {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.15
          });
        }, detailsRef);

        return () => ctx.revert();
      } else {
        gsap.to(detailsRef.current, { height: 0, opacity: 0, duration: 0.45, ease: "power3.inOut" });
      }
    }
  }, [isExpanded]);

  const cardRef = useRef(null);
  const [cardStyle, setCardStyle] = useState({
    transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.5s ease"
  });
  const [glareStyle, setGlareStyle] = useState({
    background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, transparent 50%)",
    opacity: 0,
    transition: "opacity 0.5s ease"
  });

  const handleMouseMoveCard = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Cursor position normalized between 0 and 1 relative to card bounds
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;

    // Subtle tilt angle (max 2.5 degrees since it is a large container)
    const maxTilt = 2.5;
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;

    setCardStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.006, 1.006, 1.006)`,
      transition: "none"
    });

    setGlareStyle({
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`,
      opacity: 1,
      transition: "none"
    });
  };

  const handleMouseLeaveCard = () => {
    setCardStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
    });
    setGlareStyle({
      background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, transparent 50%)",
      opacity: 0,
      transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
    });
  };

  const activePub = publications[activeTab];

  return (
    <section 
      id="achievements" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-b border-white/5"
      style={{ perspective: "1200px" }}
    >


      <div className="max-w-[1300px] mx-auto px-6 xl:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="achievements-header text-center space-y-2">
          <span className="text-xs font-semibold tracking-[0.25em] text-neon-pink uppercase block">
            Accolades & Scholarly Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
            Publications & Research
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-neon-pink to-neon-cyan mx-auto mt-4" />
        </div>

        {/* Dashboard Tabs Selector Bar */}
        <div className="dashboard-tabs-container flex justify-center pt-4">
            <div className="relative flex flex-col sm:flex-row p-1.5 rounded-3xl sm:rounded-full z-10 border border-zinc-800 bg-gradient-to-r from-zinc-900/60 via-black/95 to-zinc-900/60 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Sliding Pill Active Background Layer (Water Droplet Glass Bubble) */}
            <div
              className="absolute rounded-full liquid-capsule-smoke pointer-events-none z-0 h-[calc(100%-12px)] top-[6px] hidden sm:block after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[50%] after:bg-gradient-to-b after:from-white/20 after:to-transparent after:rounded-t-full overflow-hidden"
              style={{
                left: `${activeTabStyle.left}px`,
                width: `${activeTabStyle.width}px`,
                transition: "left 500ms cubic-bezier(0.16, 1, 0.3, 1), width 500ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />

            {publications.map((pub, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-6 py-3.5 text-xs sm:text-sm font-mono font-black tracking-wider uppercase rounded-full transition-all duration-300 select-none z-10 flex items-center justify-center gap-2 flex-grow sm:flex-grow-0 ${
                    isActive
                      ? "text-white font-extrabold scale-105 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                      : "text-white/60 hover:text-white"
                  }`}
                  style={{
                    background: isActive && window.innerWidth < 640 ? "rgba(100, 100, 100, 0.15)" : "transparent",
                    border: isActive && window.innerWidth < 640 ? "1px solid rgba(160, 160, 160, 0.4)" : "transparent",
                  }}
                >
                  <Award size={14} className={isActive ? "text-white" : "text-white/40"} />
                  <span>{pub.tabName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Dashboard Viewport */}
        <div className="dashboard-viewport max-w-5xl mx-auto pt-4">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMoveCard}
            onMouseLeave={handleMouseLeaveCard}
            className="w-full rounded-[2.5rem] overflow-hidden p-6 sm:p-8 relative transition-all duration-1000 ease-out liquid-glass"
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(30, 30, 32, 0.55) 25%, rgba(0, 0, 0, 0.9) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderTop: "1px solid rgba(255, 255, 255, 0.38)",
              boxShadow: `
                inset 0 6px 16px rgba(255, 255, 255, 0.22),
                inset 0 1px 2px rgba(255, 255, 255, 0.3),
                inset 0 -12px 36px rgba(0, 0, 0, 0.75),
                0 30px 60px rgba(0, 0, 0, 0.85),
                0 0 35px rgba(255, 255, 255, 0.03)
              `,
              transform: cardStyle.transform,
              transition: cardStyle.transition,
            }}
          >
            {/* Interactive Dynamic Glare Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
              style={glareStyle}
            />

            {/* Specular Water Droplet Top Glare Reflection overlay */}
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent rounded-t-[2.5rem] pointer-events-none z-10" />
            {/* Ambient inner soft flare backing */}

            
            {/* Futuristic vector tech-grid overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] -z-10" />

            <div ref={contentRef} className="relative z-10 flex flex-col space-y-5">
              
              {/* Top Meta Info Row */}
              <div className="animate-view-item flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-900 pb-5">
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[8.5px] font-mono font-bold tracking-widest uppercase border transition-colors duration-1000"
                      style={{
                        color: activePub.brandColor,
                        borderColor: `${activePub.brandColor}40`,
                        backgroundColor: `${activePub.brandColor}08`
                      }}
                    >
                      {activePub.type}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                      Paper 0{activeTab + 1}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
                    {activePub.title}
                  </h3>
                  <p
                    className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest leading-none pt-0.5 transition-colors duration-1000"
                    style={{ color: activePub.brandColor }}
                  >
                    {activePub.tagline}
                  </p>
                </div>
              </div>

              {/* Authors & Citation Box */}
              <div className="animate-view-item flex flex-col gap-2.5 text-xs text-zinc-400 font-sans text-left border-b border-zinc-900 pb-5">
                <div className="flex items-start gap-2">
                  <BookOpen size={16} className="text-zinc-500 flex-shrink-0 mt-0.5 transition-colors duration-1000" style={{ color: activePub.brandColor }} />
                  <span>
                    <strong className="text-white font-medium">Journal & Venue:</strong> {activePub.journal} ({activePub.citation})
                  </span>
                </div>
              </div>

              {/* Short Summary (Preview) */}
              <div className="animate-view-item text-left space-y-1">
                <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  Short Summary
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm font-sans font-normal leading-relaxed text-justify">
                  {activePub.shortSummary}
                </p>
              </div>

              {/* Subject Domain Tags */}
              <div className="animate-view-item space-y-1.5 text-left">
                <div className="flex flex-wrap gap-1.5">
                  {activePub.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2.5 py-0.5 rounded bg-zinc-900/60 border border-zinc-800/80 font-mono text-[8.5px] font-bold text-zinc-400 select-none hover:border-zinc-700 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expand Toggle & Links Footer */}
              <div className="animate-view-item pt-3 border-t border-zinc-900/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                
                {/* Accordion Expand Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>{isExpanded ? "Hide Details" : "Read Full Abstract & Highlights"}</span>
                  <ChevronDown 
                    size={13} 
                    className="text-zinc-400 transition-transform duration-300" 
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {/* Direct Action Link Buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={activePub.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial py-2 px-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 hover:text-neon-pink hover:scale-[1.02]"
                  >
                    <ExternalLink size={12} />
                    <span>View Abstract</span>
                  </a>

                  <a
                    href={activePub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial py-2 px-4 rounded-xl text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${activePub.brandColor}15`,
                      border: `1px solid ${activePub.brandColor}30`,
                      color: activePub.brandColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${activePub.brandColor}25`;
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${activePub.brandColor}15`;
                      e.currentTarget.style.color = activePub.brandColor;
                    }}
                  >
                    <FileText size={12} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Collapsible Details Panel (Full Abstract & Highlights) */}
              <div
                ref={detailsRef}
                className="overflow-hidden text-left h-0 opacity-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 border-t border-zinc-900/60 mt-5">
                  
                  {/* Left Column: Full Abstract (60%) */}
                  <div className="md:col-span-7 space-y-2 animate-drawer-item">
                    <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Full Abstract & Methodology
                    </h4>
                    <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed text-justify font-sans">
                      {activePub.abstract}
                    </p>
                    {activePub.doi && (
                      <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-zinc-500">
                        <span className="uppercase font-bold">DOI:</span>
                        <a
                          href={activePub.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors duration-300"
                          style={{ color: activePub.brandColor }}
                        >
                          {activePub.doi}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Key Highlights & Contributions (40%) */}
                  <div className="md:col-span-5 space-y-3.5 animate-drawer-item">
                    <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Key Highlights & Contributions
                    </h4>
                    <ul className="space-y-3">
                      {activePub.details.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-2.5 items-start text-zinc-300 text-xs sm:text-[12.5px] leading-relaxed font-sans">
                          <Sparkles size={12} className="text-neon-pink flex-shrink-0 mt-0.5 transition-colors duration-1000" style={{ color: activePub.brandColor }} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
