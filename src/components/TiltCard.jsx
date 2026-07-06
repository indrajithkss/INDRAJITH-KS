import React, { useRef, useState } from "react";

export default function TiltCard({ children, className = "", maxTilt = 12, ...props }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "all 0.5s ease",
  });
  const [glareStyle, setGlareStyle] = useState({
    background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, transparent 50%)",
    opacity: 0,
    transition: "all 0.5s ease",
  });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Cursor position normalized between 0 and 1 relative to the static parent rect
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;

    // Angle calculation based on hover position
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "none", // disable transition for snappy tracking
    });

    setGlareStyle({
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
      opacity: 1,
      transition: "none",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "all 0.5s ease-out",
    });
    setGlareStyle({
      background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, transparent 50%)",
      opacity: 0,
      transition: "all 0.5s ease-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none ${className}`}
      {...props}
    >
      {/* Dynamic Tilt Card Wrapper */}
      <div
        style={style}
        className="w-full h-full relative rounded-2xl overflow-hidden"
      >
        {/* Glare overlay layer */}
        <div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
          style={glareStyle}
        />
        {children}
      </div>
    </div>
  );
}
