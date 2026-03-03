"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Users, Briefcase } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Emerging & Mid-Career Creatives",
    description: "Built for professionals seeking practical, industry-aligned skills in film and screen production.",
  },
  {
    icon: Target,
    title: "Professional Training Institute",
    description: "Not a traditional film school—we accelerate talent, production capacity, and creative industry growth.",
  },
  {
    icon: Briefcase,
    title: "International Film Hub",
    description: "Connecting training with industry execution through hands-on labs and global collaboration.",
  },
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B3A5F] mb-6">
            Who We Are
          </h2>
          <p className="text-xl sm:text-2xl text-[#1B3A5F]/80 max-w-4xl mx-auto leading-relaxed">
            GFI is built for emerging and mid-career creatives seeking practical, industry-aligned skills in film and screen production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#FAFBFC] rounded-2xl p-8 hover:shadow-lg transition-all"
            >
              <div className="w-7 h-7 bg-[#1B3A5F]/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-4 h-4 text-[#1B3A5F]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1B3A5F] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#5F6B7A] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-96 rounded-2xl overflow-hidden"
        >
          <Image
            src="/rwerew424.JPG"
            alt="GFI Training Environment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5F]/80 to-transparent flex items-end p-12">
            <p className="text-xl sm:text-2xl text-white leading-relaxed max-w-4xl">
              We function as a <span className="font-semibold">professional training institute</span> and <span className="font-semibold">international film hub</span> designed to accelerate talent, production capacity, and creative industry growth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
