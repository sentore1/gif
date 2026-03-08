import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Leaf, Briefcase, Lightbulb } from "lucide-react";

export default async function ProgramsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const programs = [
    {
      icon: GraduationCap,
      title: "Intensive Certificate Programs",
      description: "4-12 week full-time programs delivering industry certificates and professional portfolios through practical workshops, on-set simulations, production labs, and industry mentorship.",
      color: "bg-[#1B3A5F]/10 text-[#1B3A5F]"
    },
    {
      icon: Leaf,
      title: "Professional Bootcamps",
      description: "1-3 week intensive masterclass model for skill upgrading, industry transition, and specialized technical training led by industry practitioners and international collaborators.",
      color: "bg-[#1B3A5F]/10 text-[#1B3A5F]"
    },
    {
      icon: Briefcase,
      title: "Film Production Labs",
      description: "Project-based hands-on collaborative filmmaking environments producing short films, proof-of-concept projects, actor showreels, and development-ready scripts.",
      color: "bg-[#1B3A5F]/10 text-[#1B3A5F]"
    },
    {
      icon: Lightbulb,
      title: "Acting for Film and Theater (AFA)",
      description: "Flagship screen performance training program covering Acting for Camera for Theater, character development, audition techniques, script interpretation, voice & movement, and showreel production.",
      color: "bg-[#1B3A5F]/10 text-[#1B3A5F]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <GinNavbar user={user} alwaysLight />
      
      <div className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-6">Industry-Focused Professional Training</h1>
        <p className="text-lg text-[#1B3A5F]/70 leading-relaxed mb-16 max-w-3xl">
          At Global Film Institute (GFI), our programs are designed for direct industry application. We deliver short, intensive, and production-driven training formats that equip participants with professional competence and market readiness.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
              <program.icon className="w-8 h-8 text-[#1B3A5F] mb-6" />
              <h2 className="font-display text-2xl font-bold text-[#1B3A5F] mb-4">{program.title}</h2>
              <p className="text-[#1B3A5F]/70 leading-relaxed text-sm">{program.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1B3A5F] text-white p-12 rounded-lg text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Begin Your Film Career?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards becoming an industry-ready screen professional through GFI's intensive training programs.
          </p>
          <Link href="/apply">
            <Button className="bg-white hover:bg-white/90 text-[#1B3A5F] font-semibold px-8 py-6 text-lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>

      <GinFooter />
    </div>
  );
}
