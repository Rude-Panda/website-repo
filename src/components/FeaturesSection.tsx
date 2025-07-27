"use client";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";

// --- Features Data ---
// Array of feature objects, each containing title, shortTitle, points, and media
const features = [
  // 1. Multiple Modes
  {
    title: "Multiple Modes. Limitless Possibilities.",
    description: "Pick your medium — image, video, or 3D. Combine them to bring ideas to life.",
    media: (
      <video
        src="/Modes/multiple-modes-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
      />
    ),
  },
  // 2. Multiple Models
  {
    title: "Multiple Models, One Interface",
    description: "Switch between top-tier AI models seamlessly in a unified studio.",
    media: (
      <video
        src="/Modes/video-enhance.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
      />
    ),
  },
  // {
  //   title: "Multiple Models, One Interface",
  //   description: "Switch between top-tier AI models seamlessly in a unified studio.",
  //   media: (
  //     <Image
  //       src="/GenerationTypes/type-image.png"
  //       alt="Image Feature"
  //       width={800}
  //       height={600}
  //       style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
  //       unoptimized
  //       onError={() => console.error("Failed to load type-image.png")}
  //     />
  //   ),
  // },
  // 3. 3D Generation Support
  {
    title: "3D Generation Support",
    description: "Bring imagination to life with 3D generation.",
    media: (
      <video
        src="/Modes/video-enhance.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
      />
    ),
  },
  // {
  //   title: "3D Generation Support",
  //   description: "Bring imagination to life with 3D generation.",
  //   media: (
  //     <Image
  //       src="/GenerationTypes/type-3d.png"
  //       alt="3D Feature"
  //       width={800}
  //       height={600}
  //       style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0, opacity: 0.7 }}
  //       unoptimized
  //       onError={() => console.error("Failed to load type-3d.png")}
  //     />
  //   ),
  // },
  // 4. Projects
  {
    title: "Stay Organized. Stay Creative.",
    description: "Work with structure. Each project keeps your media grouped and easy to manage.",
    media: (
      <video
        src="/Modes/projects.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
      />
    ),
  },
  // 5. Smart Media Enhancements
  {
    title: "Smart Media Enhancements",
    description: "Take your videos to the next level with our advanced video enhancements. Upscale, Refine, and Remix",
    media: (
      <video
        src="/Modes/video-enhance.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
      />
    ),
  },
  // 5. Explore
  {
    title: "Explore Gallery",
    description: "Browse public content and remix what inspires you with visible model metadata. Use others' creations as templates to kickstart your own ideas.",
    media: (
      <video
        src="/Modes/video-enhance.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 0 }}
      />
    ),
  },
];

// --- FeaturesSection Component ---
// Main component for displaying the features section with page scroll
export default function FeaturesSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track which feature is currently in the center of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const centerY = viewportHeight / 2;
            const elementCenterY = rect.top + rect.height / 2;

            // Check if the element's center is within the viewport center
            if (Math.abs(elementCenterY - centerY) < rect.height / 2) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              if (index !== current) {
                console.log('Setting current to:', index, 'from:', current); // Debug log
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrent(index);
                  setTimeout(() => setIsTransitioning(false), 150);
                }, 75);
              }
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better detection
        rootMargin: '-30% 0px -30% 0px' // Adjusted margin for better center detection
      }
    );

    // Observe all feature containers
    const featureContainers = document.querySelectorAll('[data-index]');
    console.log('Found feature containers:', featureContainers.length); // Debug log
    featureContainers.forEach((container) => observer.observe(container));

    return () => observer.disconnect();
  }, [current]);

  // Manual scroll handler as backup
  useEffect(() => {
    const handleScroll = () => {
      const featureContainers = document.querySelectorAll('[data-index]');
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;

      featureContainers.forEach((container, idx) => {
        const rect = container.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;

        if (Math.abs(elementCenterY - centerY) < rect.height / 2) {
          if (idx !== current) {
            console.log('Scroll handler: Setting current to:', idx, 'from:', current);
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrent(idx);
              setTimeout(() => setIsTransitioning(false), 150);
            }, 75);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [current]);

  // Debug log for current state changes
  useEffect(() => {
    console.log('Current feature changed to:', current);
  }, [current]);

  return (
    <section
      id="features"
      // className="w-[100vw] bg-background border-t"
      className="mx-auto bg-background"
    >
      <div className="w-full">
        <div className="sticky top-0 flex justify-center items-center p-4  bg-background">
          <h1 className="text-3xl font-bold font-mono">Game changing features</h1>
        </div>
        <div className="flex w-full border">
          {/* --- Left Column: Feature List --- */}
          <div className="w-1/2 border-r">
            <div className="">
              {features.map((feature, idx) => (
                <div
                  key={feature.description}
                  data-index={idx}
                  className="w-full flex items-center"
                // className="w-full min-h-[60vh] flex items-center"
                >
                  <motion.div
                    // className="flex flex-col justify-center text-left transition-all duration-300 ease-in-out w-full h-screen"
                    className={`flex flex-col justify-center text-left w-full p-8 h-[50vh]  ${idx === current ? "bg-accent/20 border-l border-cyan-500" : ""}`}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: idx === current ? 1 : 0.6 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <h3 className="text-2xl font-bold mb-8 font-mono">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-muted-foreground mb-6 font-mono">
                      {feature.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Right Column: Feature Media --- */}
          <div
            className="w-1/2 flex items-center justify-center px-4 sticky top-0"
            style={{
              height: "100vh",
            }}
          >
            <motion.div
              className="relative w-full h-[calc(100vh-2rem)]"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 0.95 : 1 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            >
              {/* Render all media elements but only show the current one */}
              {features.map((feature, idx) => (
                <motion.div
                  key={`${feature.description}-${idx}`}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: idx === current ? 1 : 0, scale: idx === current ? 1 : 0.95 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  style={{ pointerEvents: idx === current ? "auto" : "none" }}
                >
                  {feature.media}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <Separator className="my-16" />
      </div>
    </section>
  );
}
