"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/images/00942902db3f9d365917f75b04c55d36.jpg", alt: "Film Training" },
  { src: "/images/0744b3b781b549979fb1d65dd35225df.jpg", alt: "Production" },
  { src: "/images/0f7693c39d4c17c48b42351d089ca335.jpg", alt: "Collaboration" },
  { src: "/images/356aa58cd77b41182782d2823b87104c.jpg", alt: "Industry" },
  { src: "/images/3c7bfd5eae2c9f1641bb8dbbb993f1a7.jpg", alt: "Screen Performance" },
  { src: "/images/4908f9216960bde491d77c1c3c99f571.jpg", alt: "Professional Training" },
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
