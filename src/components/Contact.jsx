import React, { useState } from "react";
import { Send, ArrowRight, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("sending");

    // Simulate sending message API
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="hidden absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-neon-pink/5 blur-[120px] pointer-events-none -z-10" />
      <div className="hidden absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1700px] mx-auto px-6 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Contact button */}
          <div className="lg:col-span-4 flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-neon-pink uppercase">
                Let's Work Together
              </span>
              <h2 className="text-4xl font-display font-bold text-white tracking-tight">
                Have a <span className="bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">Project</span> in Mind?
              </h2>
            </div>
            
            <p className="text-white text-sm md:text-base font-light leading-relaxed">
              I'm always open to discussing product ideas, opportunities and collaborations.
            </p>

            <a
              href="mailto:hello@indrajith.dev"
              className="group py-2.5 px-5 rounded-lg border border-neon-cyan/30 hover:border-neon-cyan bg-transparent text-white font-medium text-xs tracking-wider flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300"
            >
              CONTACT ME
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Center Column: Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl border border-white/5 bg-dark-purple/30 backdrop-blur-md shadow-2xl relative">
              
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
                  <div className="p-4 rounded-full bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-white">Message Received!</h3>
                    <p className="text-xs text-gray-400">Thanks for writing, I'll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-cyan/60 rounded-lg px-4 py-3 text-white text-sm outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-cyan/60 rounded-lg px-4 py-3 text-white text-sm outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                      Your Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows="4"
                      placeholder="Let's build something epic..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-cyan/60 rounded-lg px-4 py-3 text-white text-sm outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 font-light resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-pink to-neutral-600 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(229,231,235,0.25)] transition-all duration-300 disabled:opacity-50"
                  >
                    {status === "sending" ? "SENDING MESSAGE..." : "SEND MESSAGE"}
                    <Send size={12} />
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Envelope illustration */}
          <div className="lg:col-span-3 flex justify-center items-center py-6">
            <div className="relative group w-[220px] h-[220px] flex items-center justify-center">
              {/* Floating bubble effects around the envelope */}
              <div className="absolute top-2 left-4 w-6 h-6 rounded-full bg-neon-pink/20 animate-float blur-sm" />
              <div className="absolute bottom-6 right-2 w-8 h-8 rounded-full bg-neon-cyan/20 animate-float-slow blur-sm" />
              
              {/* Envelope frame */}
              <div className="w-[180px] h-[180px] rounded-full border border-white/5 flex items-center justify-center p-4 bg-dark-purple animate-float">
                <img
                  src="/assets/contact-envelope.png"
                  alt="Glowing Envelope Graphic"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=400"; // fallback mail image
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
