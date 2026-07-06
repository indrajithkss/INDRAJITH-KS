import React, { useEffect, useState, useRef } from "react";
import TiltCard from "./TiltCard";

export default function Stats() {
  const statsData = [
    { value: 10, suffix: "+", label: "Projects Built" },
    { value: 4, suffix: "+", label: "Job Simulations" },
    { value: 1, suffix: "+", label: "Internships Done" },
    { value: 500, suffix: "+", label: "GitHub Commits" },
    { value: 15, suffix: "+", label: "Tech Stack Tools" },
    { value: 5, suffix: "+", label: "Certifications" },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easedProgress = progress * (2 - progress);

            setCounts(
              statsData.map((stat) => {
                const currentVal = Math.floor(stat.value * easedProgress);
                return currentVal > stat.value ? stat.value : currentVal;
              })
            );

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCounts(statsData.map((stat) => stat.value));
            }
          }, frameDuration);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-black/20">
      <div className="max-w-[1700px] mx-auto px-6 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statsData.map((stat, idx) => (
            <TiltCard key={idx} maxTilt={15} className="shadow-lg rounded-2xl">
              <div
                className="p-6 w-full rounded-2xl border border-white/5 liquid-glass text-center hover:border-neon-pink/20 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-display font-black text-white group-hover:text-neon-pink transition-colors">
                  {counts[idx]}
                  <span className="text-neon-cyan">{stat.suffix}</span>
                </div>
                <div className="text-[10px] md:text-xs font-mono font-semibold tracking-wider text-gray-500 uppercase mt-2 group-hover:text-gray-400 transition-colors">
                  {stat.label}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
