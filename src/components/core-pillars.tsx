"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Zap, Film, Globe } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Intensive Certificate Programs",
    description: "4-12 week full-time programs with practical workshops, on-set simulations, and industry mentorship.",
  },
  {
    icon: Zap,
    title: "Professional Bootcamps",
    description: "1-3 week intensive masterclasses for skill upgrading and specialized technical training.",
  },
  {
    icon: Film,
    title: "Film Production Labs",
    description: "Project-based collaborative filmmaking developing short films and showreels.",
  },
  {
    icon: Globe,
    title: "International Co-Production",
    description: "Cross-border partnerships, script development labs, and production facilitation.",
  },
];

export default function CorePillars() {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-6">
            Our Training Model
          </h2>
          <p className="text-lg text-[#5F6B7A] max-w-3xl mx-auto">
            Professional programs combining intensive training with hands-on production experience and international collaboration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-gradient-to-br from-[#1B3A5F] to-[#1B3A5F]/90 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-4">
                  {pillar.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { src: "/images/00942902db3f9d365917f75b04c55d36.jpg", alt: "Training" },
            { src: "/images/0744b3b781b549979fb1d65dd35225df.jpg", alt: "Production" },
            { src: "/images/356aa58cd77b41182782d2823b87104c.jpg", alt: "Collaboration" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
