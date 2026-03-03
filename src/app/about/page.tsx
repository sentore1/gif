import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";
import { createClient } from "../../../supabase/server";

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <GinNavbar user={user} alwaysLight />
      
      <div className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-6">Global Film Institute (GFI)</h1>
        <p className="text-lg text-[#1B3A5F]/70 leading-relaxed mb-12">
          Global Film Institute (GFI) is an industry-driven film training and development institute dedicated to preparing professionals for the evolving global screen industry.
        </p>
        <p className="text-lg text-[#1B3A5F]/70 leading-relaxed mb-16">
          Operating under Global Film Institute (GIN), GFI integrates professional short intensive programs with international collaboration, co-production initiatives, and film market engagement, creating a direct bridge between training and industry execution.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#1B3A5F] mb-2">Our Mission</h2>
            <p className="text-[#1B3A5F]/70 leading-relaxed">
              To accelerate professional film training and international collaboration that strengthens the creative economy and expands global screen opportunities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#1B3A5F] mb-2">Our Vision</h2>
            <p className="text-[#1B3A5F]/70 leading-relaxed">
              To become a leading regional film training and international co-production hub recognized for excellence, innovation, and sustainable creative industry impact.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <div className="bg-white p-12 rounded-lg shadow-sm">
            <h2 className="font-display text-3xl font-bold text-[#1B3A5F] mb-4">Our Positioning</h2>
            <p className="text-[#1B3A5F]/80 leading-relaxed mb-6">
              GFI operates as both an Industry Professional Training Institute and an International Film Hub.
            </p>
            <p className="text-[#1B3A5F]/70 leading-relaxed mb-4">We deliver:</p>
            <ul className="list-disc list-inside text-[#1B3A5F]/70 space-y-2 mb-6">
              <li>Short, high-impact programs designed for immediate industry application</li>
              <li>Real production environments with professional discipline</li>
              <li>Practical experience and portfolio-ready projects</li>
              <li>Industry exposure and professional credibility</li>
              <li>International co-production partnerships and film labs</li>
              <li>Screen talent incubation and film market networking</li>
            </ul>
          </div>

          <div className="bg-white p-12 rounded-lg shadow-sm">
            <h2 className="font-display text-3xl font-bold text-[#1B3A5F] mb-4">Acting for Film and Theater (AFA)</h2>
            <p className="text-[#1B3A5F]/80 leading-relaxed mb-6">
              AFA is the flagship professional training program of GFI, designed specifically for screen performance.
            </p>
            <p className="text-[#1B3A5F]/70 leading-relaxed mb-6">
              Through intensive, camera-focused instruction, AFA prepares actors for film, television, and digital platforms.
            </p>
            <ul className="list-disc list-inside text-[#1B3A5F]/70 space-y-2 mb-6">
              <li>Acting for Camera for Theater & Character Development</li>
              <li>Audition & Casting Techniques</li>
              <li>Script Analysis & Interpretation</li>
              <li>Voice & Movement for Screen</li>
              <li>On-Set Professional Ethics</li>
              <li>Showreel & Portfolio Production</li>
            </ul>
            <p className="text-[#1B3A5F]/80 leading-relaxed">
              AFA transforms raw talent into industry-ready screen professionals.
            </p>
          </div>

          <div className="bg-white p-12 rounded-lg shadow-sm">
            <h2 className="font-display text-3xl font-bold text-[#1B3A5F] mb-4">International Co-Production Platform</h2>
            <p className="text-[#1B3A5F]/80 leading-relaxed mb-6">
              GFI operates as an emerging regional co-production and film collaboration hub.
            </p>
            <p className="text-[#1B3A5F]/70 leading-relaxed mb-4">We facilitate:</p>
            <ul className="list-disc list-inside text-[#1B3A5F]/70 space-y-2 mb-6">
              <li>Cross-border film partnerships and script development labs</li>
              <li>Talent exchange programs and international production facilitation</li>
              <li>Creative financing alignment through GIN</li>
              <li>Film market forums connecting producers, investors, and distributors</li>
              <li>Creative industry incubation with development mentorship</li>
            </ul>
            <p className="text-[#1B3A5F]/80 leading-relaxed">
              Our objective is to train talent and facilitate scalable film ventures.
            </p>
          </div>

          <div className="bg-[#1B3A5F] text-white p-12 rounded-lg">
            <h2 className="font-display text-3xl font-bold mb-4">Strategic Advantage</h2>
            <p className="text-xl text-white/90 mb-6">Operating under Global Film Institute (GIN)</p>
            <p className="text-white/80 leading-relaxed mb-6">
              As part of GIN, GFI operates within a broader capital integration and industry development strategy.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">This structure ensures:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2 mb-6">
              <li>Alignment between training and production financing</li>
              <li>Sustainable industry pipeline development</li>
              <li>Scalable creative ventures with long-term economic impact</li>
              <li>Structured project evaluation and capital alignment models</li>
            </ul>
          </div>
        </div>
      </div>

      <GinFooter />
    </div>
  );
}
