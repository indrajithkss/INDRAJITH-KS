import React, { useState, useEffect } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap";

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);

  const certifications = [
    {
      title: "AWS Certified SysOps Administrator – Associate (SOA-C02)",
      issuer: " AWS (Linkedin Learning)",
      image: "/assets/certifications/AWS CERTIFIED SYSOPS ADMINISTRATOR.png",
      verifyLink: "https://www.linkedin.com/learning/certificates/8a6fce9ba5b78267211427443e0598fda7eb9f24712f82b9d7bfb1c57ba9a509?trk=share_certificate",
    },
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google (Coursera)",
      image: "/assets/certifications/GOOGLE DATA ANALYTICS.png",
      verifyLink: "https://www.coursera.org/account/accomplishments/specialization/48AS385TOBCY",
    },
    {
      title: "BCG – Generative AI Job Simulation",
      issuer: "Forage",
      image: "/assets/certifications/GEN AI JOB SIMULATION.png",
      verifyLink: "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/gabev3vXhuACr48eb_SKZxezskWgmFjRvj9_ABvXWTsGNAGrXSMh8_1758639830338_completion_certificate.pdf",
    },
    {
      title: "AWS APAC – Solutions Architecture Virtual Experience",
      issuer: "Forage",
      image: "/assets/certifications/AWS SOLUTIONS ARCHITECTURE JOB SIMULATION.png",
      verifyLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_ABvXWTsGNAGrXSMh8_1752655852186_completion_certificate.pdf",
    },
    {
      title: "Deloitte Australia – Data Analytics Job Simulation",
      issuer: "Forage",
      image: "/assets/certifications/DELOITTE DATA ANALYTICS JOB SIMULATION.png",
      verifyLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_ABvXWTsGNAGrXSMh8_1752687096226_completion_certificate.pdf",
    },
    {
      title: "Copado – Salesforce DevOps Certification",
      issuer: "Copado",
      image: "/assets/certifications/COPADO SALESFORCE DEVOPS.png",
      verifyLink: "https://success.copado.com/",
    },
    {
      title: "Prodigy InfoTech – Web Development Internship",
      issuer: "Prodigy InfoTech",
      image: "/assets/certifications/PRODIGY INTERNSHIP.png",
      verifyLink: "https://prodigyinfotech.dev/verify?cin=PIT/JUN25/05011",
    },
    {
      title: "AI Fluency Framework & Foundations",
      issuer: "Anthropic Learning",
      image: "/assets/certifications/AI FLUENCY FRAMEWORK & FOUNDATIONS.png",
      verifyLink: "https://verify.skilljar.com/c/oyoufmbmxnwh",
    },
    {
      title: "Claude 101 – Generative AI Foundations",
      issuer: "Anthropic Learning",
      image: "/assets/certifications/CALUDE 101.png",
      verifyLink: "https://verify.skilljar.com/c/xwdm2e7oubmh",
    },
    {
      title: "Be10x – AI Tools Workshop Mastery",
      issuer: "Be10x",
      image: "/assets/certifications/BE10X.png",
      verifyLink: "https://certx.in/certificate/0270772f-3809-4400-b29b-1e1c61cd09971386980",
    },
    {
      title: "CI/CD Solutions & Azure DevOps",
      issuer: "Microsoft (LinkedIn Learning)",
      image: "/assets/certifications/CI CD SOLUTIONS AZURE DEVOPS.png",
      verifyLink: "https://www.linkedin.com/learning/certificates/b014de702c00599ddb4e3a92d4569dcde1e9c3f80311a78c29acbc0ca1d74a6e?u=92695330",
    },
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM (Coursera)",
      image: "/assets/certifications/IBM-PYTHON FOR DATA SCIENCE.png",
      verifyLink: "https://www.coursera.org/account/accomplishments/verify/QPST41QES92Q",
    },
  ];

  const visibleCertifications = showAll ? certifications : certifications.slice(0, 5);

  // Initial scroll entrance animation using GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#certifications",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        ".certs-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }
      )
      .fromTo(
        ".cert-card-initial",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out"
        },
        "-=0.5"
      )
      .fromTo(
        ".certs-more-btn",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  // Stagger extra cards entry when clicking "View More"
  useEffect(() => {
    if (showAll) {
      gsap.fromTo(
        ".cert-card-extra",
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out"
        }
      );
    }
  }, [showAll]);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-zinc-900">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/2 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 xl:px-16 space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-2 certs-header">
          <span className="text-xs font-semibold tracking-[0.25em] text-neon-pink uppercase block">
            Accreditations
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
            Certifications
          </h2>
        </div>

        {/* Certificates Composed Folder-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {visibleCertifications.map((cert, idx) => {
            const isExtra = idx >= 5;
            return (
              <div 
                key={idx} 
                className={`flex flex-col relative group h-[350px] ${isExtra ? "cert-card-extra" : "cert-card-initial"}`}
              >
                {/* Document Sheet Sticking out from behind (z-0) */}
                <div 
                  className="absolute top-2 left-6 right-6 h-36 bg-zinc-950/90 border border-white/10 rounded-xl overflow-hidden z-0 transition-all duration-500 ease-out group-hover:-translate-y-8 group-hover:scale-[1.02] group-hover:border-neon-pink/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>

                {/* Foreground Folder Structure (z-10) */}
                <div className="relative z-10 mt-28 h-[220px] w-full">
                  
                  {/* SVG Background Path (Liquid Glass Folder Cover) */}
                  <svg 
                    className="absolute inset-0 w-full h-full z-0 drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-none"
                    viewBox="0 0 360 220"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id={`folderGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.005)" />
                      </linearGradient>
                      <linearGradient id={`folderGlow-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
                      </linearGradient>
                      
                      {/* Mathematically exact clipPath coordinates scaled to match pixel path perfectly */}
                      <clipPath id={`folderClip-${idx}`} clipPathUnits="objectBoundingBox">
                        <path d="M 0,0.090909 L 0,0.054545 A 0.033333,0.054545 0 0 1 0.033333,0 L 0.305555,0 C 0.361111,0 0.361111,0.090909 0.416666,0.090909 L 0.966666,0.090909 A 0.033333,0.054545 0 0 1 1,0.145454 L 1,0.945454 A 0.033333,0.054545 0 0 1 0.966666,1 L 0.033333,1 A 0.033333,0.054545 0 0 1 0,0.945454 Z" />
                      </clipPath>
                    </defs>
                    
                    {/* Folder Cover Body Path - Uses high-precision C1 S-Curve */}
                    <path
                      d="M 0,20 L 0,12 A 12,12 0 0 1 12,0 L 110,0 C 130,0 130,20 150,20 L 348,20 A 12,12 0 0 1 360,32 L 360,208 A 12,12 0 0 1 348,220 L 12,220 A 12,12 0 0 1 0,208 Z"
                      fill={`url(#folderGrad-${idx})`}
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      className="transition-colors duration-300 group-hover:stroke-white/30"
                    />
                    
                    {/* Specular Highlight */}
                    <path
                      d="M 0,20 L 0,12 A 12,12 0 0 1 12,0 L 110,0 C 130,0 130,20 150,20 L 348,20 A 12,12 0 0 1 360,32 L 360,60 L 0,60 Z"
                      fill={`url(#folderGlow-${idx})`}
                      className="opacity-40"
                    />
                  </svg>

                  {/* Content Overlay - Clipped precisely to matching SVG folder boundaries */}
                  <div 
                    className="absolute inset-0 z-10 p-5 flex flex-col justify-between backdrop-blur-[6px]"
                    style={{
                      clipPath: `url(#folderClip-${idx})`,
                      WebkitClipPath: `url(#folderClip-${idx})`
                    }}
                  >
                    {/* Details text block */}
                    <div className="space-y-1.5 text-left pt-6 relative z-10">
                      <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-neon-pink">
                        {cert.issuer}
                      </span>
                      <h3 className="text-xs sm:text-sm font-display font-extrabold text-white tracking-tight uppercase leading-snug group-hover:text-neon-pink transition-colors duration-300 line-clamp-2">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider" />
                    </div>

                    {/* Action button at bottom */}
                    <div className="pt-2.5 border-t border-white/10 flex-shrink-0 relative z-10 flex justify-end">
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-4 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-neon-pink/30 hover:text-neon-pink text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:scale-105"
                      >
                        <span>Verify Certificate</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic View More Toggle */}
        {certifications.length > 5 && (
          <div className="flex justify-center pt-8 certs-more-btn">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-neon-pink/30 hover:text-neon-pink text-white font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:scale-105"
            >
              <span>{showAll ? "Show Less" : "View More Certifications"}</span>
              {!showAll ? (
                <>
                  <ChevronDown size={14} className="text-neon-pink" />
                  <span className="text-[10px] text-zinc-500 font-normal">
                    ({certifications.length - 5} more)
                  </span>
                </>
              ) : (
                <ChevronUp size={14} className="text-neon-pink" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
