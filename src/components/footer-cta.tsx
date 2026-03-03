"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Handshake } from "lucide-react";
import { Button } from "./ui/button";

export default function FooterCTA() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-[#E4E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[#5F6B7A] max-w-2xl mx-auto font-body">
            Take the first step towards transforming your future. Join our
            community of innovators, creators, and leaders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg font-medium active:scale-[0.98] transition-all group"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white px-8 py-6 text-lg font-medium transition-all"
            >
              <Handshake className="mr-2 w-5 h-5" />
              Partner With Us
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white px-8 py-6 text-lg font-medium transition-all"
            >
              <Users className="mr-2 w-5 h-5" />
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
