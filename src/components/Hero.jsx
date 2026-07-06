import React, { useEffect, useRef } from "react";
import { Mail, ArrowRight, Download } from "lucide-react";
import gsap from "gsap";

function FloatingSocialIcon({ children, href, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animId;
    const loop = () => {
      // Add a slow, organic floating movement
      const floatOffset = Math.sin(Date.now() * 0.002) * 2.5;

      element.style.transform = `translate3d(0, ${floatOffset}px, 0)`;

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={ref} className="social-icon-wrapper block">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-12 h-12 rounded-full liquid-capsule-smoke text-gray-400 hover:text-white flex items-center justify-center hover:shadow-[0_0_30px_rgba(255,255,255,0.45),_inset_0_4px_12px_rgba(255,255,255,0.35)] hover:bg-white/10 hover:scale-130 hover:border-white/60 transition-all duration-300 relative overflow-hidden backdrop-blur-xl after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[50%] after:bg-gradient-to-b after:from-white/20 after:to-transparent after:rounded-t-full group"
      >
        <div className="group-hover:scale-110 transition-transform duration-300 relative z-10 flex items-center justify-center">
          {children}
        </div>
      </a>
    </div>
  );
}

export default function Hero({ isLoading }) {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);

  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      href: "https://github.com/indrajithkss",
      label: "GitHub",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://www.linkedin.com/in/indrajith-ks-40aa62227/",
      label: "LinkedIn",
    },
    { icon: <Mail size={18} />, href: "mailto:indrajithindra55@gmail.com", label: "Email" },
  ];

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.querySelector("#projects");
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  // Entrance timelines triggered on Loader finish
  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        // Initial values for left side elements
        gsap.set(".hero-fade", { opacity: 0, y: 50 });
        gsap.set(".social-icon-wrapper", { scale: 0.7, rotation: -20, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.4 } });

        tl.to(".hero-fade", {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.6,
        })
        .to(".social-icon-wrapper", {
          scale: 1,
          rotation: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=1.0");

        // Portrait Luxury entrance sequence
        gsap.fromTo(
          portraitRef.current,
          {
            scale: 1.15,
            filter: "grayscale(100%) contrast(110%) brightness(95%) blur(20px)",
            opacity: 0,
            y: 80,
          },
          {
            scale: 1,
            filter: "grayscale(100%) contrast(110%) brightness(95%) blur(0px)",
            opacity: 0.85,
            y: 0,
            duration: 2.0,
            ease: "power4.out",
          }
        );
      }, heroRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  // Unified loop for Parallax (Mouse + Scroll)
  useEffect(() => {
    if (isLoading) return;

    const targetMousePos = { x: 0, y: 0 };
    const currentMousePos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      targetMousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMousePos.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId;
    const loop = () => {
      // Lerp mouse positions
      currentMousePos.x += (targetMousePos.x - currentMousePos.x) * 0.08;
      currentMousePos.y += (targetMousePos.y - currentMousePos.y) * 0.08;

      const px = currentMousePos.x;
      const py = currentMousePos.y;
      const scrollY = window.scrollY;

      const bgBlobs = document.querySelectorAll(".hero-bg-blob");
      const heroTexts = document.querySelectorAll(".hero-parallax-text");
      const heroButtons = document.querySelectorAll(".hero-parallax-btn");
      const heroPortrait = document.querySelector(".hero-portrait-container");
      const heroSocials = document.querySelectorAll(".hero-parallax-social");

      // Background bloom layer: max 2px
      bgBlobs.forEach((el) => {
        el.style.transform = `translate3d(${px * 2}px, ${py * 2}px, 0)`;
      });

      // Text elements layer: max 6px, scroll speed multiplier -0.15 (medium depth)
      const textScroll = scrollY * -0.15;
      heroTexts.forEach((el) => {
        el.style.transform = `translate3d(${px * 6}px, ${py * 6 + textScroll}px, 0)`;
      });

      // Buttons elements layer: max 8px, scroll speed multiplier -0.25 (foreground depth)
      const btnScroll = scrollY * -0.25;
      heroButtons.forEach((el) => {
        el.style.transform = `translate3d(${px * 8}px, ${py * 8 + btnScroll}px, 0)`;
      });

      // Social icons layer: max 8px, scroll speed multiplier -0.22
      const socialScroll = scrollY * -0.22;
      heroSocials.forEach((el) => {
        el.style.transform = `translate3d(${px * 8}px, ${py * 8 + socialScroll}px, 0)`;
      });

      // Portrait Image wrapper layer: max 15px, scroll speed multiplier 0.08 (background depth)
      const portraitScroll = scrollY * 0.08;
      if (heroPortrait) {
        heroPortrait.style.transform = `translate3d(${px * 15}px, ${py * 15 + portraitScroll}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isLoading]);

  const handleMouseMovePortrait = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--portrait-light-x", `${x}%`);
    e.currentTarget.style.setProperty("--portrait-light-y", `${y}%`);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen pt-28 pb-12 flex flex-col justify-between items-center relative overflow-hidden"
    >
      {/* Decorative Blur Backgrounds removed to keep the background strictly black */}

      <div className="relative z-20 flex-1 w-full max-w-[1700px] mx-auto px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Dynamic Texts, Console log prompt and buttons */}
        <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-white uppercase block hero-fade hero-parallax-text select-none">
              Hi, I'm
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-white leading-none lg:whitespace-nowrap hero-fade hero-parallax-text">
              <span className="text-sweep py-2 block">INDRAJITH KS</span>
            </h1>
          </div>

          {/* Subheading / Roles */}
          <div className="space-y-1">
            <p className="text-sm md:text-lg lg:text-2xl font-semibold tracking-wider text-white font-mono uppercase hero-fade hero-parallax-text">
              Full-Stack Developer (MERN) | Mobile App Development | Data Science | IoT| MCA Graduate, JAIN University |
            </p>
            <p className="text-sm md:text-lg lg:text-2xl font-semibold tracking-wider text-white font-mono uppercase hero-fade hero-parallax-text">Open to Opportunities  </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2 hero-fade hero-parallax-btn">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-pink to-orange-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_#ff9f1c] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              EXPLORE PROJECTS
              <ArrowRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-lg border border-white/10 hover:border-neon-cyan/40 bg-white/5 backdrop-blur-md text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              DOWNLOAD RESUME
              <Download size={16} />
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 pt-4 hero-fade hero-parallax-social">
            {socialLinks.map((link, idx) => (
              <FloatingSocialIcon key={idx} href={link.href} label={link.label}>
                {link.icon}
              </FloatingSocialIcon>
            ))}
          </div>
        </div>
      </div>

      {/* Far Right Corner Portrait */}
      <div className="hidden lg:flex absolute right-0 bottom-0 lg:h-[500px] xl:h-[580px] 2xl:h-[660px] select-none pointer-events-none z-10 items-end justify-end hero-portrait-container">
        {/* Image Wrapper */}
        <div 
          ref={portraitRef} 
          className="relative h-full w-auto flex items-end justify-end pointer-events-auto group overflow-hidden"
          onMouseMove={handleMouseMovePortrait}
        >
          {/* Interactive lighting overlay simulating light tracking mouse pointer */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-30" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at var(--portrait-light-x, 50%) var(--portrait-light-y, 50%), rgba(255,255,255,0.3) 0%, transparent 60%)' 
            }} 
          />

          {/* Left fade gradient overlay */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />

          {/* Bottom fade gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

          {/* Top fade gradient overlay to blend height */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

          <img
            src="/assets/about-portrait.png?v=1.3"
            alt="Indrajith KS Portrait"
            className="h-full w-auto object-contain object-bottom filter grayscale contrast-110 brightness-95 opacity-85 hover:opacity-100 transition-opacity duration-700 pointer-events-auto"
            style={{
              WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 35%, transparent 72%)",
              maskImage: "radial-gradient(circle at 50% 45%, black 35%, transparent 72%)"
            }}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800";
            }}
          />
        </div>
      </div>
    </section>
  );
}
