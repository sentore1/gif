import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";
import { createClient } from "../../../supabase/server";
import { Shield, Award, MessageSquare, TrendingUp } from "lucide-react";

export default async function BrandPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const governance = [
    {
      icon: Shield,
      title: "Brand Ownership",
      description: "The GIN name, logo, tagline, and all related brand assets are the exclusive intellectual property of Global Film Institute Ltd. No partnership or venture shall confer ownership rights over the GIN brand."
    },
    {
      icon: Award,
      title: "Brand Usage & Approval",
      description: "All use of the GIN brand, including logos, naming, visual materials, public communications, and campaigns, must receive prior written approval from GIN. Partners may only use the brand within the scope of approved programs and agreements."
    },
    {
      icon: MessageSquare,
      title: "Representation & Communication",
      description: "No partner, affiliate, or program may represent itself or communicate publicly on behalf of GIN without explicit authorization. GIN maintains a unified voice, tone, and messaging across all platforms and partnerships."
    },
    {
      icon: TrendingUp,
      title: "Brand Evolution",
      description: "GIN reserves the right to evolve its brand identity, positioning, and messaging to align with strategic growth, while maintaining continuity and recognition."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <GinNavbar user={user} alwaysLight />
      
      <div className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-navy mb-6">Brand Governance & Protection</h1>
        <p className="text-lg text-navy/70 leading-relaxed mb-16 max-w-3xl">
          GIN maintains a strong brand governance framework to protect its identity, credibility, and long-term value. Our brand represents our commitment to excellence, integrity, and impact.
        </p>

        <div className="bg-navy text-white p-12 rounded-lg mb-16">
          <h2 className="font-display text-3xl font-bold mb-6">Brand Positioning Statement</h2>
          <p className="text-white/90 text-xl leading-relaxed">
            Global Film Institute is a venture platform that invests in and co-builds innovative initiatives to generate lasting impact.
          </p>
        </div>

        <h2 className="font-display text-3xl font-bold text-navy mb-8">Governance Framework</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {governance.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-4">{item.title}</h3>
              <p className="text-navy/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 p-8 rounded-lg">
          <h3 className="font-display text-2xl font-bold text-navy mb-4">Important Notice</h3>
          <p className="text-navy/70 leading-relaxed">
            All partners, affiliates, and stakeholders are required to adhere to these brand governance guidelines. Unauthorized use of GIN brand assets may result in termination of partnership agreements and legal action. For brand usage inquiries, please contact our brand management team.
          </p>
        </div>
      </div>

      <GinFooter />
    </div>
  );
}
