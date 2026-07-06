import React from "react";
import { Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      href: "https://github.com/indrajithkss",
      label: "GitHub",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: "https://www.linkedin.com/in/indrajith-ks-40aa62227/",
      label: "LinkedIn",
    },
    { icon: <Mail size={16} />, href: "mailto:indrajithindra55@gmail.com", label: "Email" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-white/5 bg-black/40 py-12 relative overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 xl:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Logo and tagline */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-neon-pink to-neon-cyan flex items-center justify-center font-display font-black text-black text-xs">
              IK
            </div>
            <span className="font-display font-extrabold text-sm tracking-wider text-white">
              INDRAJITH <span className="bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">KS</span>
            </span>
          </div>
          <p className="text-gray-500 text-xs font-light">
            Building scalable web applications, generative AI, and IoT solutions.
          </p>
        </div>

        {/* Center: Social links */}
        <div className="md:col-span-3 flex justify-center gap-4">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-8 h-8 rounded-full border border-white/5 text-gray-500 hover:text-white hover:border-neon-pink/40 hover:bg-neon-pink/15 transition-all duration-300 flex items-center justify-center"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Right Side: Copyright and Back to Top button */}
        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-6 w-full">
          <span className="text-[10px] font-mono text-gray-500 w-full text-center md:text-right">
            © 2026 Indrajith KS. All Rights Reserved.
          </span>
          <button
            onClick={handleScrollToTop}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:border-neon-pink text-gray-400 hover:text-white flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,0,127,0.25)] hover:bg-neon-pink/10 transition-all duration-300 flex-shrink-0"
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
