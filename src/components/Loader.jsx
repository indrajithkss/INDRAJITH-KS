import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const percentages = [0, 12, 35, 58, 82, 100];
    const tl = gsap.timeline({
      onComplete: () => {
        // Morph/dissolve animation: logo scale down, container fades out
        gsap.timeline()
          .to(logoRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "power4.inOut",
          })
          .to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.8,
            ease: "expo.out",
            onComplete: onComplete,
          }, "-=0.3");
      }
    });

    // Staggered percentage updates matching the custom steps
    percentages.forEach((val, index) => {
      if (index === 0) return;
      const prevVal = percentages[index - 1];
      const duration = 0.45 + Math.random() * 0.15; // premium cinematic dynamic duration
      
      tl.to({}, {
        duration: duration,
        onUpdate: function() {
          const progress = this.ratio;
          const currentVal = Math.round(prevVal + (val - prevVal) * progress);
          setPercent(currentVal);
        }
      }, `step-${index}`);

      tl.to(progressLineRef.current, {
        scaleX: val / 100,
        duration: duration,
        ease: "power2.inOut",
      }, `step-${index}`);
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="flex flex-col items-center select-none relative">
        {/* Glow backdrop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-neon-pink/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

        {/* Glowing Logo */}
        <div
          ref={logoRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-tr from-neon-pink to-neon-cyan flex items-center justify-center font-display font-black text-black text-2xl shadow-[0_0_35px_rgba(255,159,28,0.4)] relative z-10"
        >
          IK
        </div>

        {/* Percentage text */}
        <span className="mt-6 font-mono text-lg font-medium text-white/80 tracking-widest relative z-10">
          {percent}%
        </span>

        {/* Progress bar container */}
        <div className="w-48 h-[1px] bg-white/10 mt-4 rounded-full overflow-hidden relative z-10">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan origin-left w-full scale-x-0"
          />
        </div>
      </div>
    </div>
  );
}
