import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";
import { createClient } from "../../../supabase/server";
import { TrendingUp, Film, Users, Leaf } from "lucide-react";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const services = [
    {
      icon: TrendingUp,
      title: "Investment & Capital Structuring",
      description: "We mobilize and manage capital dedicated to financing commercially viable productions and creative enterprises. Our structured approach ensures efficiency, accountability, and scalable growth."
    },
    {
      icon: Film,
      title: "Production Oversight & Project Development",
      description: "We support projects from early development through production and market entry, ensuring operational excellence and revenue optimization."
    },
    {
      icon: Users,
      title: "Advisory & Consultancy",
      description: "We provide end-to-end consultancy services including financial planning, budgeting control, revenue modelling, distribution strategy, and investment packaging—strengthening both local and international competitiveness."
    },
    {
      icon: Leaf,
      title: "Impact & Sustainability",
      description: "Beyond financial performance, we recognize media as a powerful driver of influence and transformation. Our productions intentionally integrate themes related to environmental protection, climate responsibility, and sustainable development."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <GinNavbar user={user} alwaysLight />
      
      <div className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-navy mb-6">What We Do</h1>
        <p className="text-lg text-navy/70 leading-relaxed mb-16 max-w-3xl">
          We provide comprehensive services that transform creative concepts into sustainable, impactful ventures through strategic investment, expert guidance, and operational excellence.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <service.icon className="w-12 h-12 text-gold mb-6" />
              <h2 className="font-display text-2xl font-bold text-navy mb-4">{service.title}</h2>
              <p className="text-navy/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-navy to-navy/90 text-white p-12 rounded-lg">
          <h2 className="font-display text-3xl font-bold mb-6">ESG Commitment</h2>
          <p className="text-white/90 leading-relaxed">
            By aligning our activities with Environmental, Social, and Governance (ESG) principles, we contribute to responsible investment practices while amplifying awareness through strategic storytelling. Our commitment extends beyond profit to create meaningful change in communities and industries we serve.
          </p>
        </div>
      </div>

      <GinFooter />
    </div>
  );
}
