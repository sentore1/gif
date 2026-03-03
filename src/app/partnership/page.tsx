import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Handshake, FileText, Users, Building2, Globe, ArrowRight } from "lucide-react";

export default async function PartnershipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const opportunities = [
    { icon: FileText, title: "Program Sponsorship", description: "Support professional training initiatives and talent development" },
    { icon: Handshake, title: "Co-Production Financing", description: "Film development and production partnerships" },
    { icon: Globe, title: "Film Market Collaboration", description: "Industry forums and networking platforms" },
  ];

  const stakeholders = [
    { icon: Building2, title: "Film Production Companies", description: "Co-production and financing partners" },
    { icon: Handshake, title: "International Film Schools", description: "Educational collaboration partners" },
    { icon: Users, title: "Cultural & Arts Institutions", description: "Development and program partners" },
    { icon: Globe, title: "Streaming & Distribution Platforms", description: "Market access partners" },
    { icon: Building2, title: "Private Investors & Corporate Sponsors", description: "Capital and strategic partners" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <GinNavbar user={user} alwaysLight />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-[#1B3A5F] mb-6">Partnership & Investor Engagement</h1>
            <p className="text-xl text-[#5F6B7A] leading-relaxed mb-8">
              Global Film Institute operates within the broader investment and capital integration strategy of GIN, providing partners with structured project evaluation and industry growth frameworks.
            </p>
            <Link href="/contact">
              <Button className="bg-[#1B3A5F] hover:bg-[#1B3A5F]/90 text-white px-8 py-6 text-lg font-semibold group">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/rwrewrwcaca.JPG" alt="Partnership" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Partnership Opportunities */}
      <div className="py-24 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-16 text-center">Partnership Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <item.icon className="w-12 h-12 text-[#1B3A5F] mb-6" />
                <h3 className="font-display text-2xl font-bold text-[#1B3A5F] mb-4">{item.title}</h3>
                <p className="text-[#5F6B7A] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Partners */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-16 text-center">Collaboration Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholders.map((stakeholder, index) => (
              <div key={index} className="bg-[#FAFBFC] p-6 rounded-xl hover:shadow-md transition-all">
                <stakeholder.icon className="w-10 h-10 text-[#1B3A5F] mb-4" />
                <h3 className="font-display text-lg font-bold text-[#1B3A5F] mb-2">{stakeholder.title}</h3>
                <p className="text-[#5F6B7A] text-sm">{stakeholder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-[#1B3A5F]">
        <div className="max-w-4xl mx-auto px-6 lg:px-20 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Partner with GFI?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Join us in building a professional training accelerator, co-production gateway, and creative economy development platform.
          </p>
          <Link href="/contact">
            <Button className="bg-white hover:bg-white/90 text-[#1B3A5F] font-semibold px-10 py-7 text-lg">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </div>

      <GinFooter />
    </div>
  );
}
