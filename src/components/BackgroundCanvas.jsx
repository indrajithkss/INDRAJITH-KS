import React, { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse pointer
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 120, // attraction/merging radius
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      // Drift mouse back to center when off screen
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    // Click triggers liquid splashes
    const handleClick = (e) => {
      for (let i = 0; i < 8; i++) {
        splashes.push(new Splash(e.clientX, e.clientY));
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // Splashed liquid droplet
    class Splash {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 25 + 15;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 1.0;
        this.color = Math.random() > 0.5 ? "#ff9f1c" : "#ffd166";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Gravitational attraction back to mouse blob
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 10) {
          this.vx += (dx / dist) * 0.2;
          this.vy += (dy / dist) * 0.2;
        }

        // friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.life -= 0.005;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Liquid Metaball Particle
    class Metaball {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.size = Math.random() * 60 + 50; // Large sizes for metaballs
        this.x = Math.random() * width;
        this.y = height + this.size + Math.random() * 200;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -(Math.random() * 1.2 + 0.5); // float up
        this.color = Math.random() > 0.5 ? "#ff9f1c" : "#ffd166";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Attracted slightly to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius * 2) {
          this.x += (dx / dist) * 0.5;
          this.y += (dy / dist) * 0.5;
        }

        // Wrap boundaries
        if (this.y < -this.size * 2) {
          this.reset();
        }
        if (this.x < -this.size * 2 || this.x > width + this.size * 2) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const metaballs = Array.from({ length: 18 }, () => new Metaball());
    const splashes = [];

    const animate = () => {
      // Clear with background color
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse coordinates for fluid trailing response
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw mouse-controlled liquid core
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 85, 0, Math.PI * 2);
      ctx.fillStyle = "#ff9f1c";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 65, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd166";
      ctx.fill();

      // Draw and update active splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        splash.update();
        if (splash.life <= 0) {
          splashes.splice(i, 1);
        } else {
          splash.draw();
        }
      }

      // Draw and update float metaballs
      metaballs.forEach((ball) => {
        ball.update();
        ball.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Apply the filter-goo-lg CSS filter directly to merge canvas shapes organically
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 filter-goo-lg"
    />
  );
}
