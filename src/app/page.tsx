import GinNavbar from "@/components/gin-navbar";
import GinHero from "@/components/gin-hero";
import WhoWeAre from "@/components/who-we-are";
import CorePillars from "@/components/core-pillars";
import FlagshipProgram from "@/components/flagship-program";
import ImageShowcase from "@/components/image-showcase";
import VisionStatement from "@/components/vision-statement";
import WhyPartner from "@/components/why-partner";
import FooterCTA from "@/components/footer-cta";
import GinFooter from "@/components/gin-footer";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <GinNavbar user={user} />
      <GinHero />
      <WhoWeAre />
      <FlagshipProgram />
      <CorePillars />
      <ImageShowcase />
      <VisionStatement />
      <WhyPartner />
      <FooterCTA />
      <GinFooter />
    </div>
  );
}
