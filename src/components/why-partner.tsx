"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  "Industry-aligned professional training with direct market application",
  "Access to emerging regional talent and international co-production opportunities",
  "Integrated capital framework through Global Film Institute (GIN)",
  "Structured project evaluation and capital alignment models",
  "Film market collaboration and production financing pathways",
  "Scalable creative industry model with sustainable economic development",
];

export default function WhyPartner() {
  return (
    <section id="partner" className="py-24 lg:py-32 bg-[#1B3A5F] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Partner With GFI
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-body">
            Join a professional training accelerator, co-production gateway, and creative economy development platform integrated within GIN's capital mobilization ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-[#1B3A5F]" />
              </div>
              <p className="text-white/90 font-body">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
