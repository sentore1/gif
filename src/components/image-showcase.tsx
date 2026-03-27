"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/re/Picture1.png", alt: "GFI" },
  { src: "/re/Pic53ture2.png", alt: "GFI" },
  { src: "/re/Pictetture2.png", alt: "GFI" },
  { src: "/re/Pictgture2.png", alt: "GFI" },
  { src: "/re/Picthrure2.png", alt: "GFI" },
  { src: "/re/Pictteteure2.png", alt: "GFI" },
  { src: "/re/Pictteture2.png", alt: "GFI" },
  { src: "/re/Pictu53re2.png", alt: "GFI" },
  { src: "/re/Pigegcture2.png", alt: "GFI" },
];

export default function ImageShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-6">
            Experience GFI
          </h2>
          <p className="text-lg text-[#5F6B7A] max-w-3xl mx-auto">
            Discover our professional training environment and international collaboration spaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-80 rounded-2xl overflow-hidden group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5F]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-semibold text-base">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
