"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Film, Briefcase, Video, Wand2, Camera, TrendingUp, Handshake, Briefcase as BriefcaseIcon } from "lucide-react";
import { Button } from "./ui/button";

const programs = [
  {
    icon: Film,
    title: "Acting for Film and Theater Program",
    description: "Intensive training in film acting techniques and on-camera performance",
    duration: "3-6 months",
    featured: true,
  },
  {
    icon: Briefcase,
    title: "Career Guidance & Internship",
    description: "Professional career counseling and hands-on internship opportunities",
    duration: "3-6 months",
    featured: false,
  },
  {
    icon: Video,
    title: "Film Making & TV Production",
    description: "Comprehensive training in film making, directing, and cinematography",
    duration: "3-6 months",
    featured: false,
  },
  {
    icon: Wand2,
    title: "Animation & Motion Graphics",
    description: "Learn 2D/3D animation, motion design, and visual effects creation",
    duration: "3-6 months",
    featured: false,
  },
  {
    icon: Camera,
    title: "Photography & Graphic Design",
    description: "Master photography techniques and professional graphic design skills",
    duration: "3-6 months",
    featured: false,
  },
];

export default function AllPrograms() {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-6">
            Our Programs
          </h2>
          <p className="text-lg text-[#5F6B7A] max-w-2xl mx-auto font-body">
            Choose from our range of professional development programs designed
            to launch your career in the creative industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className={`h-full rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  program.featured
                    ? "bg-navy text-white shadow-[0_8px_24px_rgba(27,58,95,0.2)]"
                    : "bg-white border border-[#E4E7EB] shadow-[0_2px_8px_rgba(27,58,95,0.08)] hover:shadow-[0_8px_24px_rgba(27,58,95,0.12)]"
                }`}
              >
                {program.featured && (
                  <div className="absolute -top-3 right-6">
                    <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                      FLAGSHIP
                    </span>
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                    program.featured
                      ? "bg-white/10"
                      : "bg-navy/5 group-hover:bg-gold/10"
                  } transition-colors`}
                >
                  <program.icon
                    className={`w-7 h-7 ${
                      program.featured
                        ? "text-gold"
                        : "text-navy group-hover:text-gold"
                    } transition-colors`}
                  />
                </div>

                <h3
                  className={`font-display text-xl font-bold mb-3 ${
                    program.featured ? "text-white" : "text-navy"
                  }`}
                >
                  {program.title}
                </h3>

                <p
                  className={`font-body leading-relaxed mb-4 ${
                    program.featured ? "text-white/80" : "text-[#5F6B7A]"
                  }`}
                >
                  {program.description}
                </p>

                <div
                  className={`text-sm font-medium ${
                    program.featured ? "text-gold" : "text-navy"
                  }`}
                >
                  Duration: {program.duration}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: programs.length * 0.1 }}
            className="h-full rounded-xl p-8 bg-navy flex flex-col justify-center gap-4"
          >
            <Link href="/contact" className="w-full">
              <Button className="w-full bg-white text-navy hover:bg-white/90 font-medium">
                <TrendingUp className="w-4 h-4 mr-2" />
                Invest With Us
              </Button>
            </Link>
            <Link href="/contact" className="w-full">
              <Button className="w-full bg-white text-navy hover:bg-white/90 font-medium">
                <Handshake className="w-4 h-4 mr-2" />
                Partner with Us
              </Button>
            </Link>
            <Link href="/contact" className="w-full">
              <Button className="w-full bg-white text-navy hover:bg-white/90 font-medium">
                <BriefcaseIcon className="w-4 h-4 mr-2" />
                Explore Our Services
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/apply">
            <Button
              size="lg"
              className="bg-navy hover:bg-navy/90 text-white px-8 py-6 text-lg font-medium active:scale-[0.98] transition-all group"
            >
              Apply to a Program
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
