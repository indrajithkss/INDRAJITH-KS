import React, { useEffect, useRef } from "react";
import { Globe, Layout, Code2, Smartphone, Database, Cloud, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  const skillsData = [
    {
      category: "Languages",
      icon: <Globe className="w-4 h-4 text-neon-pink" />,
      skills: [
        {
          name: "JavaScript",
          brandColor: "#f7df1e",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        },
        {
          name: "Python",
          brandColor: "#3776ab",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        },
        {
          name: "Java",
          brandColor: "#ea2d2e",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
        },
        {
          name: "Kotlin",
          brandColor: "#7F52FF",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
        }
      ]
    },
    {
      category: "Frontend",
      icon: <Layout className="w-4 h-4 text-neon-cyan" />,
      skills: [
        {
          name: "React.js",
          brandColor: "#61dafb",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        },
        {
          name: "HTML5",
          brandColor: "#e34f26",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
        },
        {
          name: "CSS3",
          brandColor: "#1572b6",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
        },
        {
          name: "Tailwind CSS",
          brandColor: "#38bdf8",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
        },
        {
          name: "Vite",
          brandColor: "#bd34fe",
          iconSlug: "vite"
        }
      ]
    },
    {
      category: "Backend",
      icon: <Code2 className="w-4 h-4 text-neon-pink" />,
      skills: [
        {
          name: "Node.js",
          brandColor: "#339933",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        },
        {
          name: "Express.js",
          brandColor: "#ffffff",
          iconSlug: "express/ffffff"
        },
        {
          name: "REST APIs",
          brandColor: "#00b4d8",
          // custom SVG concept fallback
          svg: (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#00b4d8]" strokeWidth="2">
              <rect x="2" y="5" width="6" height="6" rx="1" />
              <rect x="16" y="5" width="6" height="6" rx="1" />
              <rect x="9" y="14" width="6" height="6" rx="1" />
              <path d="M5 11v6a2 2 0 002 2h2M19 11v6a2 2 0 01-2 2h-2M12 11V8" strokeLinecap="round" />
            </svg>
          )
        },
        {
          name: "JWT Auth",
          brandColor: "#d63384",
          // custom SVG concept fallback
          svg: (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#d63384]" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2.5" />
              <path d="M12 14v3" strokeLinecap="round" />
            </svg>
          )
        }
      ]
    },
    {
      category: "Mobile",
      icon: <Smartphone className="w-4 h-4 text-neon-cyan" />,
      skills: [
        {
          name: "React Native",
          brandColor: "#61dafb",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        },
        {
          name: "Android SDK",
          brandColor: "#3ddc84",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
        },
        { 
          name: "Flutter",
          brandColor: "#02569B",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"  
        }
      ]
    },
    {
      category: "Databases",
      icon: <Database className="w-4 h-4 text-neon-pink" />,
      skills: [
        {
          name: "MongoDB",
          brandColor: "#47a248",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
        },
        {
          name: "MySQL",
          brandColor: "#00758f",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
        },
        {
          name: "Firebase",
          brandColor: "#ffca28",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg"
        }
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-4 h-4 text-neon-cyan" />,
      skills: [
        {
          name: "AWS",
          brandColor: "#ff9900",
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full fill-[#ff9900] p-0.5">
              <path d="M228.6 181.2c-23.7 18.2-57 28.2-88.6 28.2-44.5 0-84.7-18.4-106.8-46.2-4.1-5.2.2-10.7 5.7-7.8 22.8 11.9 51.5 19 80.9 19 28.2 0 58.7-7.4 81.3-21.7 6.4-4 12.3 2.5 7.5 8.5zm8.5-22.3c-2.3 4.2-10.2 2-15 1.2-4.7-.8-5.3-2.5-1.2-3.8 4.2-1.3 14-2.8 17.5.3 3.5 3 1 2.3-1.3 2.3z" />
              <path d="M125 45c-29.2 0-53 23.8-53 53s23.8 53 53 53 53-23.8 53-53-23.8-53-53-53zm0 78c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z" fill="#ffffff" />
            </svg>
          )
        },
        {
          name: "Git",
          brandColor: "#f05032",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
        },
        {
          name: "GitHub",
          brandColor: "#ffffff",
          iconSlug: "github/ffffff"
        }
      ]
    },
    {
      category: "Tools",
      icon: <Wrench className="w-4 h-4 text-neon-pink" />,
      skills: [
        {
          name: "OpenAI API",
          brandColor: "#10a37f",
          svg: (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-[#10a37f] p-0.5">
              <path d="M21.743 12.316a4.898 4.898 0 00-.73-3.614l-1.312.758a3.393 3.393 0 01.328 2.052 3.42 3.42 0 01-1.378 2.213l-4.773 2.756v5.512a3.414 3.414 0 01-2.912-.047 3.394 3.394 0 01-1.748-2.56l.006-1.517 1.312-.758v1.511a1.892 1.892 0 00.978 1.455 1.884 1.884 0 002.042-.083l4.773-2.756a1.9 1.9 0 00.94-1.642v-5.512l-1.312.758v3.423a3.407 3.407 0 01-1.74 2.923c-1.312.758-2.96.657-4.167-.253L8.532 9.56l-4.773 2.756a3.42 3.42 0 01-2.222 1.396 3.41 3.41 0 01-2.564-.817v5.512a3.394 3.394 0 011.164 1.794c.594.887 1.513 1.465 2.548 1.6l1.312-.758a3.393 3.393 0 01-.252-2.062c.112-.862.607-1.62 1.378-2.072l4.773-2.756v-5.512l1.312-.758v5.512c0 .668-.358 1.282-.94 1.619L6.505 17.15c-.604.35-1.336.33-1.923-.052-.587-.38-.936-1.042-.93-1.743l-.006-5.512 1.312-.758-.006 3.419c-.006.758.397 1.458 1.057 1.84a1.893 1.893 0 001.929-.052l4.773-2.756a1.886 1.886 0 00.94-1.636V5.378l-1.312.758v3.423a3.407 3.407 0 01-1.74 2.923l-4.773 2.756-1.312-.758 4.773-2.756a1.892 1.892 0 00.978-1.455 1.884 1.884 0 00-2.042-.083L4.471 11.23a1.9 1.9 0 00-.94 1.642v5.512L2.22 17.625A3.42 3.42 0 012.226 12.11l4.773-2.756V3.842a3.414 3.414 0 012.912.047c1.026.592 1.656 1.69 1.656 2.873V8.28l-1.312.758V7.527a1.892 1.892 0 00-.978-1.455 1.884 1.884 0 00-2.042.083L2.463 8.911a1.9 1.9 0 00-.94 1.642v5.512l1.312-.758V11.88c.006-.758-.397-1.458-1.057-1.84a1.893 1.893 0 00-1.929.052l-4.773 2.756a1.886 1.886 0 00-.94 1.636v5.512" />
            </svg>
          )
        },
        {
          name: "Postman",
          brandColor: "#ff6c37",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"
        },
        {
          name: "Figma",
          brandColor: "#f24e1e",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
        }
      ]
    }
  ];

  useEffect(() => {
    // Pop in bubbles stagger animation on scroll entry
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-bubble-wrapper",
        { opacity: 0, scale: 0.6, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play reset play reset"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-zinc-900 border-t border-white/5"
    >
      {/* Soft white overhead glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07)_0%,transparent_60%)] pointer-events-none -z-10" />
      {/* Local float style animation keyframes */}
      <style>{`
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .animate-float {
          animation: float-bubble 6s ease-in-out infinite;
        }
        .skills-bubble-wrapper:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-16 space-y-12">
        
        {/* Section Title Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold tracking-[0.25em] text-neon-pink uppercase block">
            My Skills
          </span>
          <h2 className="text-4xl font-display font-extrabold text-white tracking-tight leading-none">
            What I Do?
          </h2>
        </div>

        {/* Skills Bubble Grid grouped by Category */}
        <div className="space-y-12 pt-6">
          {skillsData.map((cat) => (
            <div key={cat.category} className="space-y-6 skills-category-container">
              {/* Category Subheading */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-2.5">
                {cat.icon}
                <span className="text-xs font-mono font-bold tracking-widest text-white uppercase select-none">
                  {cat.category}
                </span>
              </div>

              {/* Bubbles Grid */}
              <div className="flex flex-wrap gap-6 sm:gap-10 justify-center sm:justify-start items-center pl-1">
                {cat.skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className="skills-bubble-wrapper animate-float"
                    style={{ 
                      animationDelay: `${index * 0.25}s`,
                      animationDuration: `${5.5 + (index % 3) * 0.5}s`
                    }}
                  >
                    {/* Bubble Sphere Card */}
                    <div className="flex flex-col items-center gap-3 group cursor-default relative">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                        {/* Sphere backdrop (smoke grey with a little black glass style) */}
                        <div 
                          className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-b from-zinc-800/40 to-black/60 backdrop-blur-md transition-all duration-500 group-hover:scale-115"
                          style={{
                            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -3px 6px rgba(0, 0, 0, 0.4)",
                          }}
                        />
                        {/* Top specular glare dome reflection */}
                        <div className="absolute top-[2px] left-[15%] right-[15%] h-[32%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full rounded-b-[40%] pointer-events-none group-hover:scale-115 transition-transform duration-500 z-10" />

                        {/* Brand glow overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-35 blur-md transition-all duration-500 scale-105 rounded-full"
                          style={{
                            backgroundColor: skill.brandColor,
                            boxShadow: `0 0 25px 5px ${skill.brandColor}`
                          }}
                        />
                        {/* Brand SVG Logo / Image */}
                        <div className="relative z-20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                          {skill.iconUrl ? (
                            <img 
                              src={skill.iconUrl} 
                              alt={skill.name} 
                              className="w-full h-full object-contain p-0.5"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : skill.iconSlug ? (
                            <img 
                              src={`https://cdn.simpleicons.org/${skill.iconSlug}`} 
                              alt={skill.name} 
                              className="w-full h-full object-contain p-0.5"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            skill.svg
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wide text-gray-400 group-hover:text-white transition-colors duration-300 text-center select-none">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
