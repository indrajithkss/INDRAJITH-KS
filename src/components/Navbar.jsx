import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar({ isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Visible scroll tracking
  const [blurAmount, setBlurAmount] = useState(25);
  const [borderOpacity, setBorderOpacity] = useState(0.08);

  // The active capsule coordinates
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, height: 0 });

  // Mouse cursor tracking inside the navigation container
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  // Individual text offsets for the magnetic float attraction
  const [textOffsets, setTextOffsets] = useState({});

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
  ];

  // Animation Frame reference
  let rafId = null;
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const navRef = useRef(null);

  // Entrance animations via GSAP when loading completes
  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        // Initial states
        gsap.set(navRef.current, { y: -100, opacity: 0 });
        gsap.set(".nav-logo-group", { x: -40, opacity: 0 });
        gsap.set(".nav-item", { y: -20, opacity: 0 });
        gsap.set(".mobile-nav-btn", { scale: 0.5, opacity: 0 });

        // Entrance timeline
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

        tl.to(navRef.current, { y: 0, opacity: 1, duration: 1.5 })
          .to(".nav-logo-group", { x: 0, opacity: 1 }, "-=1.1")
          .to(".nav-item", {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.9,
          }, "-=0.9")
          .to(".mobile-nav-btn", { scale: 1, opacity: 1, duration: 0.8 }, "-=0.6");
      }, navRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);



      // Calculate scrolling speed to intensify liquid glass blur & border opacity
      const speed = Math.abs(currentScrollY - lastScrollY.current);
      const dynamicBlur = 25 + Math.min(25, speed * 0.8);
      const dynamicBorder = 0.08 + Math.min(0.18, speed * 0.005);

      setBlurAmount(dynamicBlur);
      setBorderOpacity(dynamicBorder);

      // Smoothly restore base glass values when scroll stops
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setBlurAmount(25);
        setBorderOpacity(0.08);
      }, 150);

      // Section highlighters on scroll
      const sections = navLinks.map((link) => document.querySelector(link.href));
      const scrollPosition = currentScrollY + 150;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navLinks[i].href.slice(1));
            break;
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Update slider coordinates to active tab (only when user is not hovering)
  useEffect(() => {
    if (mousePos.isHovered) return;

    const updatePositions = () => {
      const activeEl = document.querySelector(`.nav-link-${activeSection}`);
      const container = document.querySelector(`.nav-links-container`);
      
      if (activeEl && container) {
        const parentRect = container.getBoundingClientRect();
        const rect = activeEl.getBoundingClientRect();
        
        setSliderStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    const timer = setTimeout(updatePositions, 50);

    window.addEventListener("resize", updatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePositions);
    };
  }, [activeSection, mousePos.isHovered]);

  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  // Optimized Mouse move handler: implements continuous bubble tracking and magnetic text shifts
  const handleMouseMoveNav = (e) => {
    const mainWrapper = e.currentTarget;
    const container = mainWrapper.querySelector(".nav-links-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      setMousePos({ x: mouseX, y: mouseY, isHovered: true });

      const links = container.querySelectorAll(".nav-link-item");
      if (links.length) {
        let closestLink = null;
        let minDistance = Infinity;
        const newOffsets = {};

        links.forEach((link) => {
          const lRect = link.getBoundingClientRect();
          const lCenter = (lRect.left - rect.left) + (lRect.width / 2);
          const lCenterY = (lRect.top - rect.top) + (lRect.height / 2);
          const dist = Math.abs(mouseX - lCenter);

          // Find closest item for active capsule dimensions
          if (dist < minDistance) {
            minDistance = dist;
            closestLink = {
              width: lRect.width,
              height: lRect.height,
            };
          }

          // Calculate magnetic pull offset for each text link based on cursor proximity
          let dx = 0;
          let dy = 0;
          if (dist < 80) {
            dx = (mouseX - lCenter) * 0.18;
            dy = (mouseY - lCenterY) * 0.14;

            // Clamp offsets to keep text within capsule boundaries
            dx = Math.max(-7, Math.min(7, dx));
            dy = Math.max(-5, Math.min(5, dy));
          }

          newOffsets[link.getAttribute("href")] = { x: dx, y: dy };
        });

        setTextOffsets(newOffsets);

        if (closestLink) {
          let targetLeft = mouseX - (closestLink.width / 2);
          const maxL = rect.width - closestLink.width;
          targetLeft = Math.max(0, Math.min(maxL, targetLeft));

          setSliderStyle({
            left: targetLeft,
            width: closestLink.width,
            height: closestLink.height,
          });
        }
      }
    });
  };

  const handleMouseLeaveNav = () => {
    if (rafId) cancelAnimationFrame(rafId);
    setMousePos((prev) => ({ ...prev, isHovered: false }));
    setTextOffsets({}); // Clear magnetic shift offsets
    
    // Immediately trigger return to activeSection positions
    const activeEl = document.querySelector(`.nav-link-${activeSection}`);
    const container = document.querySelector(`.nav-links-container`);
    if (activeEl && container) {
      const parentRect = container.getBoundingClientRect();
      const rect = activeEl.getBoundingClientRect();
      setSliderStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-dark-void/50 py-4" : "bg-transparent py-6"
      }`}
      style={{
        backdropFilter: scrolled ? `blur(${blurAmount}px)` : "none",
        WebkitBackdropFilter: scrolled ? `blur(${blurAmount}px)` : "none",
        borderBottom: scrolled ? `1px solid rgba(255, 255, 255, ${borderOpacity})` : "none",
        transition: "padding 0.3s, background-color 0.3s",
      }}
    >
      <div className="max-w-[1700px] mx-auto px-6 xl:px-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-3 group nav-logo-group"
        >
          <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-lg bg-gradient-to-tr from-neon-pink to-neon-cyan flex items-center justify-center font-display font-black text-black text-sm lg:text-base select-none shadow-[0_0_15px_rgba(255,0,127,0.3)] group-hover:scale-105 transition-all duration-300">
            IK
          </div>
          <span className="font-display font-extrabold text-lg lg:text-2xl tracking-wider text-white select-none">
            INDRAJITH <span className="bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">KS</span>
          </span>
        </a>

        {/* Desktop Links Container with Liquidmorphic Capsule Background */}
        <div className="hidden md:flex items-center gap-8">
          <div
            onMouseMove={handleMouseMoveNav}
            onMouseLeave={handleMouseLeaveNav}
            className="relative px-2 py-1.5 rounded-full border border-zinc-800 bg-gradient-to-r from-zinc-900/60 via-black/95 to-zinc-900/60 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {/* Relative layout bounds to keep all layers aligned matching pixel offsets */}
            <div className="relative">
              
              {/* 1. Gooey Underline Background Layer (Opaque grey fluid inside, parent opacity-25) */}
              <div className="filter-goo-md absolute inset-0 pointer-events-none overflow-visible z-0 opacity-25">
                
                {/* Sliding Liquid Capsule Core (Trails with a lag to create liquid morphing tail) */}
                <div
                  className="absolute rounded-full bg-zinc-500 h-full"
                  style={{
                    width: `${sliderStyle.width}px`,
                    transform: `translate3d(${sliderStyle.left}px, 0, 0)`,
                    transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), width 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                {/* Interactive Cursor Liquid Blob */}
                {mousePos.isHovered && (
                  <div
                    className="absolute w-8 h-8 rounded-full bg-zinc-500 pointer-events-none"
                    style={{
                      transform: `translate3d(${mousePos.x - 16}px, ${mousePos.y - 16}px, 0)`,
                      transition: "none",
                    }}
                  />
                )}

              </div>

              {/* 2. Crisp Glass Capsule Layer (Grey border & glow - Directly controlled by cursor) */}
              <div
                className="absolute rounded-full liquid-capsule-smoke pointer-events-none z-0 h-full after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[50%] after:bg-gradient-to-b after:from-white/20 after:to-transparent after:rounded-t-full"
                style={{
                  width: `${sliderStyle.width}px`,
                  transform: `translate3d(${sliderStyle.left}px, 0, 0)`,
                  // Responsive transition curve so this main glossy bubble snaps instantly to cursor
                  transition: "transform 100ms cubic-bezier(0.25, 1, 0.5, 1), width 150ms cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />

              {/* Crisp Foreground Links */}
              <ul className="flex items-center gap-2 relative z-10 nav-links-container font-sans">
                {navLinks.map((link) => {
                  const offset = textOffsets[link.href] || { x: 0, y: 0 };
                  const isActive = activeSection === link.href.slice(1);
                  
                  return (
                    <li key={link.name} className="nav-item">
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className={`text-sm lg:text-base font-semibold tracking-wide px-5 py-2.5 lg:px-6 lg:py-3 rounded-full block nav-link-item nav-link-${link.href.slice(1)} select-none transition-all duration-300 ${
                          isActive
                            ? "text-white font-extrabold scale-105 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                            : "text-white/60 hover:text-white"
                        }`}
                        style={{
                          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
                          // Smooth spring curve to float back when mouse leaves focus zone
                          transition: mousePos.isHovered 
                            ? "transform 80ms ease-out, color 200ms, scale 200ms" 
                            : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms, scale 200ms",
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>

            </div>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors mobile-nav-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out overlay menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[68px] z-30 bg-dark-void/95 backdrop-blur-xl border-t border-white/5 animate-fade-in flex flex-col justify-between py-12 px-6">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-xl font-semibold tracking-wider transition-colors ${
                    activeSection === link.href.slice(1) ? "text-neon-pink" : "text-white"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-center text-xs text-gray-500 font-mono">
            &lt;indrajith-ks-portfolio /&gt;
          </div>
        </div>
      )}
    </nav>
  );
}
