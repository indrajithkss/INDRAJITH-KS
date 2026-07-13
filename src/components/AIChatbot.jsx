import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Alaska , Indrajith's portfolio assistant. Ask me anything about his projects, technical skills, education, or experience!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isBubbleHovered, setIsBubbleHovered] = useState(false);
  const [bubbleCoords, setBubbleCoords] = useState({ x: 0, y: 0 });
  const bubbleRef = useRef(null);

  const handleMouseMoveBubble = (e) => {
    if (!bubbleRef.current) return;
    const rect = bubbleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    setBubbleCoords({ x: dx, y: dy });
    setIsBubbleHovered(true);
  };

  const handleMouseLeaveBubble = () => {
    setIsBubbleHovered(false);
    setBubbleCoords({ x: 0, y: 0 });
  };

  const QA_DATABASE = [
    {
      keywords: ["tripmind", "travel", "planner", "itinerary"],
      answer: "TRIPMIND – AI-Driven Smart Travel Planner\nTech Stack: React Native, Node.js, Express.js, MongoDB, OpenAI API\n\nKey Details:\n• Developed a full-stack travel planning application using React Native, Node.js, Express.js, and MongoDB.\n• Designed and consumed RESTful APIs for user authentication, trip management, itinerary generation, and recommendations.\n• Implemented JWT-based authentication and authorization for secure user access.\n• Optimized MongoDB queries to improve backend performance and response times.\n• Integrated OpenAI API for AI-powered itinerary generation and travel recommendations.\n• Utilized Git and GitHub for version control and collaborative development.\n• Applied modular application architecture principles for scalability and maintainability."
    },
    {
      keywords: ["shield", "jacket", "safety", "iot", "sensor", "esp32"],
      answer: "SHIELD-X – IoT-Based Smart Safety Jacket\nTech Stack: ESP32, Embedded C/C++, MPU6050, NEO-6M GPS, Firebase IoT Cloud, Flutter\n\nKey Details:\n• Built an IoT-enabled wearable system for real-time rider monitoring and accident detection.\n• Implemented sensor data processing using accelerometer and gyroscope data with threshold-based logic to reduce false positives.\n• Developed a real-time data pipeline using ESP32 and Firebase IoT Cloud for remote monitoring and alert generation.\n• Built a Flutter-based mobile app for live sensor data visualization, GPS tracking, and emergency notifications.\n• Designed an SOS alert system to transmit real-time location data to predefined contacts during emergencies.\n• Developed REST-based communication between mobile application and cloud services."
    },
    {
      keywords: ["ignite", "complaint", "redressal", "django", "platform"],
      answer: "IGNITE HER – Complaint Redressal Platform\nTech Stack: Python, Django, MySQL, Scikit-learn\n\nKey Details:\n• Developed a secure full-stack web application using Django and MySQL with role-based access control (RBAC).\n• Built an end-to-end complaint lifecycle: submission, tracking, reporting, and data management.\n• Integrated a Random Forest model to analyze complaint patterns and generate actionable insights."
    },
    {
      keywords: ["pawamigo", "pet", "playdate", "kotlin", "android"],
      answer: "PAWAMIGO – Pet Playdate Finder\nTech Stack: Kotlin, Android SDK, Firebase (Auth, Firestore), Glide\n\nKey Details:\n• Developed an Android app enabling pet registration, scheduling, and nearby user discovery.\n• Implemented Firebase Authentication and Cloud Firestore for real-time sync and secure access.\n• Improved UI performance using Recycler View and optimized image loading with Glide."
    },
    {
      keywords: ["education", "mca", "bca", "university", "college", "degree", "jain", "calicut"],
      answer: "Indrajith holds a Master of Computer Applications (MCA) from JAIN (Deemed-to-be University) (2025) and a Bachelor of Computer Applications (BCA) from the University of Calicut."
    },
    {
      keywords: ["skill", "tech", "languages", "frameworks", "react", "node", "python", "java", "firebase", "aws", "git", "database"],
      answer: "Indrajith's core technical skills include:\n• Languages: JavaScript, Python, Java\n• Frontend: React.js, HTML5, CSS3\n• Backend & Mobile: Node.js, Express.js, React Native, Android (Kotlin), Flutter\n• Databases: MongoDB, MySQL, Firebase\n• Cloud & DevOps: AWS, Git, GitHub, CI/CD"
    },
    {
      keywords: ["experience", "prodigy", "work", "intern", "job"],
      answer: "Indrajith completed a Web Development Internship at Prodigy InfoTech (2025), where he built responsive applications using HTML/CSS/JS and managed versions via Git. He has also completed several virtual simulator programs (BCG GenAI, Deloitte Data, AWS Solutions)."
    },
    {
      keywords: ["contact", "email", "phone", "linkedin", "github", "hire", "address", "location"],
      answer: "You can reach Indrajith via:\n• Email: indrajithindra55@gmail.com\n• LinkedIn: linkedin.com/in/indrajith-ks-40aa62227/\n• GitHub: github.com/indrajithkss\n• Location: Bengaluru, Karnataka, India"
    },
    {
      keywords: ["simulation", "forage", "bcg", "deloitte", "aws apac"],
      answer: "Indrajith has completed 3 virtual simulations via Forage:\n1. BCG: Developed an AI-powered financial chatbot using Python & Pandas.\n2. Deloitte Australia: Designed Tableau business dashboards and data analytics logs.\n3. AWS APAC: Designed scalable cloud deployments using AWS Elastic Beanstalk."
    },
    {
      keywords: ["achievement", "achievements", "paper", "papers", "research", "publication", "publications", "published"],
      answer: "Indrajith has published 2 research papers in reputable international journals:\n\n1. \"Artificial Intelligence in Auditing: Transforming the Future of Accounting\" (IJIREM, 2026)\n• Focuses on ML-based anomaly detection systems using Random Forest to automate auditing and minimize fraud detection time for Indian SMEs.\n• View abstract: https://doi.org/10.55524/ijirem.2026.13.2.13\n\n2. \"Edge Computing in Oceanographic Research and Marine Technology: Revolutionizing Real-Time Data Processing and Decision-Making\" (IIJSR, 2025)\n• Focuses on low-latency edge computing configurations on marine sensors/buoys to resolve connectivity challenges and optimize bandwidth in harsh ocean environments.\n• View PDF: https://iijsr.com/data/uploads/84361.pdf"
    }
  ];

  const suggestionChips = [
    "What are his skills?",
    "Education details?",
    "How to contact him?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const processQuery = (queryText) => {
    const cleanQuery = queryText.toLowerCase().trim();
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of QA_DATABASE) {
      let matches = 0;
      for (const keyword of item.keywords) {
        if (cleanQuery.includes(keyword)) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = item;
      }
    }

    if (maxMatches > 0 && bestMatch) {
      return bestMatch.answer;
    }

    return "As Alaska AI, I couldn't find a direct answer to that query, but Indrajith is a Full-Stack Developer specializing in React, Node.js, Python, generative AI chatbots, and IoT systems. Try asking about his projects (like TripMind or Shield-X), education (MCA), or contact details!";
  };

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay (lava-lamp feel)
    setTimeout(() => {
      const response = processQuery(textToSend);
      const botMessage = {
        sender: "bot",
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend(input);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:right-6 sm:bottom-6 z-50 font-sans flex flex-col items-end">
      {/* 1. Toggle Floating Button */}
      {!isOpen && (
        <div
          ref={bubbleRef}
          onMouseMove={handleMouseMoveBubble}
          onMouseLeave={handleMouseLeaveBubble}
          className="w-20 h-20 relative flex items-center justify-center select-none"
        >
          {/* Outer Liquid Morphing Bubble Background (Styled as dynamic water-droplet glass) */}
          <div
            className={`absolute inset-0 rounded-full liquid-capsule-smoke shadow-[0_0_20px_rgba(255,255,255,0.2)] pointer-events-none transition-all duration-300 after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[50%] after:bg-gradient-to-b after:from-white/20 after:to-transparent after:rounded-t-full ${
              isBubbleHovered ? "scale-105" : "scale-100"
            }`}
            style={{
              transform: isBubbleHovered
                ? `translate3d(${bubbleCoords.x * 0.45}px, ${bubbleCoords.y * 0.45}px, 0) scale(1.1)`
                : 'translate3d(0, 0, 0) scale(1)',
              transition: isBubbleHovered 
                ? "transform 80ms ease-out" 
                : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          
          {/* Inner Perfect Circle Logo Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative z-10 w-14 h-14 rounded-full overflow-hidden border border-white/20 hover:scale-110 shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 group"
            title="Chat with Alaska AI"
          >
            <img
              src="/assets/chatbot-icon.png?v=1.2"
              alt="Alaska AI Logo"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      )}

      {/* 2. Glassmorphic Chat Container */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] h-[480px] max-h-[80vh] sm:max-h-none rounded-2xl border border-white/10 liquid-glass shadow-2xl overflow-hidden flex flex-col animate-fade-in">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/90 border-b border-white/5 relative">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10">
                <img
                  src="/assets/chatbot-icon.png?v=1.2"
                  alt="Alaska AI Avatar"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-green-400 border border-black animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-white leading-tight">ALASKA AI</h4>
                <p className="text-[9px] text-gray-500 font-mono">Portfolio Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-black/10 scrollbar-thin select-text">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${msg.sender === "user"
                      ? "bg-gradient-to-r from-white/10 to-white/20 border border-white/20 text-white rounded-tr-none"
                      : "bg-zinc-900/60 border border-white/5 text-gray-300 rounded-tl-none shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)]"
                    }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-gray-600 font-mono mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-zinc-900/60 border border-white/5 px-3.5 py-2.5 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex flex-wrap gap-1.5 z-10 select-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-black/95 border-t border-white/5 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me something..."
              className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-white/20 focus:bg-white/10 transition-all font-sans"
            />
            <button
              onClick={() => handleSend(input)}
              className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-black hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              <Send size={14} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
