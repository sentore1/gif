"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Film, Users, Award, Clapperboard } from "lucide-react";
import { Button } from "./ui/button";

const highlights = [
  {
    icon: Film,
    title: "Acting for Camera and Theater",
    description: "Screen-specific performance training with character development",
  },
  {
    icon: Clapperboard,
    title: "Professional Production",
    description: "On-set training and showreel portfolio creation",
  },
  {
    icon: Users,
    title: "Industry Mentorship",
    description: "Learn from working film industry professionals",
  },
  {
    icon: Award,
    title: "Industry Certificate",
    description: "Recognized certification upon program completion",
  },
];

export default function FlagshipProgram() {
  return (
    <section id="afa" className="py-24 lg:py-32 bg-gradient-to-br from-[#1B3A5F] to-[#1B3A5F]/90 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">Flagship Program</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Acting for Film and Theater
          </h2>

          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            GFI's premier screen performance training program, dedicated exclusively to professional acting for the camera. Transform into an industry-ready screen professional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="w-12 h-12  rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-display text-base font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/70">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/apply">
            <Button size="lg" className="bg-white hover:bg-white/90 text-[#1B3A5F] px-10 py-7 text-base font-semibold group">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
