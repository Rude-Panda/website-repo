"use client";
import * as React from "react";
// import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = React.useState<{ x: number; y: number } | null>(null);
  const [imageError, setImageError] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleMouseLeave = () => setMouse(null);

  const handleImageError = () => {
    setImageError(true);
    console.error("Failed to load hero image");
  };

  // Torch effect constants
  const torchRadius = 200;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col min-h-screen w-full bg-background overflow-hidden"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image: grayscale by default */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        {/* Greyscale/dark image */}
        <Image
          src="/Hero/hero-2.jpg"
          alt="Hero background"
          fill
          className="object-cover grayscale contrast-800 brightness-60"
          draggable={false}
          priority
          onError={handleImageError}
          unoptimized
        />
        {/* Torch color effect */}
        {mouse && !imageError && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              WebkitMaskImage: `radial-gradient(circle ${torchRadius}px at ${mouse.x}px ${mouse.y}px, white 60%, rgba(255,255,255,0.7) 75%, transparent 100%)`,
              maskImage: `radial-gradient(circle ${torchRadius}px at ${mouse.x}px ${mouse.y}px, white 60%, rgba(255,255,255,0.7) 75%, transparent 100%)`,
            }}
            initial={false}
            animate={{}}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
          >
            <Image
              src="/Hero/hero-2.jpg"
              alt="Hero background color"
              fill
              className="object-cover"
              draggable={false}
              priority
              unoptimized
              style={{ zIndex: 2 }}
            />
          </motion.div>
        )}
      </div>
      {/* Header Text */}
      {/* <div className="flex flex-col justify-center items-center text-center z-10 w-screen h-screen">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
          Welcome to LumyraFX
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-mono">
          Your one-stop solution for amazing things.
        </p>
        <div className="flex justify-center items-center mt-8">
          <Button
            className="p-8 text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer text-primary rounded-none font-mono"
            asChild
          >
            <a className="text-white" href="/login">Try it now</a>
          </Button>
        </div>
      </div> */}
    </section>
  );
}
