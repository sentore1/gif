"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  "/slideimages/image1 (1).JPG",
  "/slideimages/tertretwe.jpg",
  "/slideimages/Creative Industries.jpg",
  "/slideimages/15947.jpg",
];

export default function GinHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative">
              <Image src={src} alt={`Slide ${i + 1}`} fill className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A5F]/70 via-[#1B3A5F]/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />  
            <h3 className="font-display text-3xl sm:text-3xl lg:text-5xl font-bold text-white mb-12">
              Global Film Institute
            </h3>
            
            <p className="text-base text-white/80 mb-12 max-w-2xl leading-relaxed">
              An industry-driven film training and development institute dedicated to preparing professionals for the evolving global screen industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/programs">
                <Button className="bg-white hover:bg-white/90 text-[#1B3A5F] px-8 py-6 text-base font-semibold group">
                  Explore Programs
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button variant="outline" className="border-7 border-white text-[#1b3a5f] hover:bg-white hover:text-[#1B3A5F] px-8 py-6 text-base font-semibold">
                  Apply Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
