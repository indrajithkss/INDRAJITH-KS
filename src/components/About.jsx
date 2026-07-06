import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import TiltCard from "./TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Local interactive particle/node connection graphics canvas
const AboutParticlesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = [];
    const particleCount = 40;
    const connectionDistance = 120;

    const mouse = {
      x: null,
      y: null,
      radius: 180,
    };

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", handleResize);
    canvas.parentElement.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 1;
        this.color =
          Math.random() > 0.5
            ? "rgba(255, 159, 28, 0.2)"
            : "rgba(255, 209, 102, 0.2)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse push effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 1.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeEventListener("mousemove", handleMouseMove);
        canvas.parentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-60"
    />
  );
};

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Settings for smooth entry
      gsap.set(".about-left-card, .about-portrait-card, .about-edu-card, .about-course-card", {
        opacity: 0,
        y: 45
      });
      gsap.set(".about-left-header, .about-left-para, .about-left-btn", {
        opacity: 0,
        y: 20
      });
      gsap.set(".about-info-item", {
        opacity: 0,
        scale: 0.9,
        y: 12
      });
      gsap.set(".about-timeline-line", {
        scaleY: 0,
        transformOrigin: "top"
      });
      gsap.set(".about-timeline-dot", {
        scale: 0,
        opacity: 0
      });
      gsap.set(".about-timeline-item-content", {
        opacity: 0,
        x: -15
      });
      gsap.set(".about-course-chip", {
        opacity: 0,
        scale: 0.75
      });

      // 2. Main Scroll-Triggered Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play reset play reset",
        }
      });

      // Staggered reveal of the main card containers
      tl.to(".about-left-card, .about-portrait-card, .about-edu-card, .about-course-card", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
      });

      // Inside Left Card (Biography)
      tl.to(".about-left-header", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5");

      tl.to(".about-left-para", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.4");

      tl.to(".about-info-item", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(1.15)"
      }, "-=0.3");

      tl.to(".about-left-btn", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

      // Education Timeline Growing & Reveal
      tl.to(".about-timeline-line", {
        scaleY: 1,
        duration: 0.8,
        ease: "power1.inOut"
      }, "-=0.6");

      tl.to(".about-timeline-dot", {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        stagger: 0.2,
        ease: "back.out(2)"
      }, "-=0.75");

      tl.to(".about-timeline-item-content", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.65");

      // Coursework Stagger Chips Pop-in
      tl.to(".about-course-chip", {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.025,
        ease: "back.out(1.6)"
      }, "-=0.6");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      {/* local dynamic particles network graphics */}
      <AboutParticlesCanvas />

      <div className="max-w-[1700px] mx-auto px-6 xl:px-16 animate-section-glow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Column: Biography & Info inside unified Glass Card */}
          <div className="lg:col-span-5 flex about-left-card">
            <TiltCard maxTilt={5} className="w-full flex">
              <div className="p-6 sm:p-8 w-full rounded-2xl liquid-glass-premium flex flex-col justify-between h-full select-none">
                <div className="space-y-6">
                  <div className="space-y-3 about-left-header">
                    <span className="text-xs font-semibold tracking-[0.25em] text-neon-pink uppercase block">
                      About Me
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                      Who Am I?
                    </h2>
                  </div>

                  <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-light text-justify">
                    <p className="about-left-para">
                      I'm <span className="font-semibold text-white">Indrajith KS</span>, an MCA graduate and Software Engineer passionate about building scalable digital solutions through <span className="font-semibold text-white">Full Stack Development, Data Analytics, Data Science, and Mobile Application Development</span>. I specialize in designing modern web and mobile applications, developing secure backend systems, and transforming data into actionable insights using modern technologies and analytical tools.
                    </p>
                    <p className="about-left-para">
                      Driven by curiosity and continuous learning, I enjoy solving complex problems, optimizing business processes, and creating innovative, user-centric solutions. I'm currently seeking opportunities where I can contribute as a <span className="font-semibold text-white">Software Engineer, Full Stack Developer, Data Analyst, Data Scientist, or Mobile Application Developer</span> while delivering meaningful impact through technology.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mt-6">
                  {/* Additional Info Cards Grid */}
                  <div className="grid grid-cols-3 gap-3 text-left">
                    {/* Location Card */}
                    <div className="about-info-item p-3.5 rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-neon-pink/30 hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_-8px_rgba(0,0,0,0.8),0_0_15px_rgba(255,159,28,0.1)] transition-all duration-300 group/info">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-gray-400 group-hover/info:text-neon-pink transition-colors block uppercase">LOCATION</span>
                      <span className="text-xs font-semibold text-white mt-1 block">Bengaluru, IN</span>
                    </div>
                    {/* Languages Card */}
                    <div className="about-info-item p-3.5 rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_-8px_rgba(0,0,0,0.8)] transition-all duration-300 group/info">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-gray-400 block uppercase">LANGUAGES</span>
                      <span className="text-xs font-semibold text-white mt-1 block flex flex-wrap gap-1">English, Malayalam, Hindi, Tamil</span>
                    </div>
                    {/* Availability Card */}
                    <div className="about-info-item p-3.5 rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-neon-cyan/30 hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_-8px_rgba(0,0,0,0.8),0_0_15px_rgba(255,209,102,0.1)] transition-all duration-300 group/info">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-gray-400 group-hover/info:text-neon-cyan transition-colors block uppercase">AVAILABILITY</span>
                      <span className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Immediate
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-start about-left-btn">
                    <a
                      href="#projects"
                      className="group py-2.5 px-5 rounded-lg border border-neon-pink/30 hover:border-neon-pink bg-transparent text-white font-semibold text-xs tracking-widest flex items-center gap-2 hover:shadow-[0_0_15px_rgba(255,0,127,0.2)] hover:bg-neon-pink/5 transition-all duration-300"
                    >
                      EXPLORE PROJECTS
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Middle Column: Portrait inside Glass Container */}
          <div className="lg:col-span-3 flex items-center justify-center about-portrait-card">
            <TiltCard maxTilt={5} className="w-full max-w-[320px] flex">
              <div className="w-full rounded-2xl liquid-glass-premium overflow-hidden relative group aspect-[3/4]">
                <img
                  src="/assets/about-image.PNG"
                  alt="Indrajith Portrait"
                  className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 filter grayscale contrast-110 brightness-95"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Education & Coursework */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-center">
            {/* Education Glass Card */}
            <div className="about-edu-card">
              <TiltCard maxTilt={5} className="w-full">
                <div className="p-6 w-full rounded-2xl liquid-glass-premium shadow-xl select-none">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-neon-pink uppercase mb-5 select-none">
                    Education
                  </h3>

                  {/* Timeline layout */}
                  <div className="relative pl-5 ml-1.5 space-y-6">
                    {/* Animated timeline line */}
                    <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-neon-pink via-neon-cyan to-transparent about-timeline-line" />

                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-white border border-black shadow-[0_0_10px_#ffffff] about-timeline-dot" />
                      <div className="about-timeline-item-content">
                        <h4 className="text-sm font-semibold text-white leading-snug">Master of Computer Applications (MCA)</h4>
                        <p className="text-xs text-neon-cyan font-mono mt-0.5">JAIN (Deemed-to-be University)</p>
                        <span className="text-[10px] text-gray-500 font-mono">2024 - 2026</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-gray-500 border border-black about-timeline-dot" />
                      <div className="about-timeline-item-content">
                        <h4 className="text-sm font-semibold text-white leading-snug">Bachelor of Computer Applications (BCA)</h4>
                        <p className="text-xs text-neon-cyan font-mono mt-0.5">University of Calicut</p>
                        <span className="text-[10px] text-gray-500 font-mono">2021 - 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Coursework Glass Card */}
            <div className="about-course-card">
              <TiltCard maxTilt={5} className="w-full">
                <div className="p-6 w-full rounded-2xl liquid-glass-premium shadow-xl select-none">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase mb-4 select-none">
                    Core Coursework
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Data Structures & Algorithms (DSA)",
                      "Data Science",
                      "Database Management Systems (DBMS)",
                      "Operating Systems (OS)",
                      "Object-Oriented Programming (OOP)",
                      "Computer Networks (CN)",
                      "Software Engineering (SE)",
                      "Machine Learning (ML)",
                      "Web Technologies",
                      "Agile Methodologies (SDLC)"
                    ].map((course, idx) => (
                      <span
                        key={idx}
                        className="about-course-chip text-[10px] font-mono px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-gray-300 hover:border-white/20 hover:text-white hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 select-none cursor-default inline-block"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
