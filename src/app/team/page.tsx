import Image from "next/image";
import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";

const teamMembers = [
  {
    name: "MAZIMPAKA JONES KENNEDY",
    role: "International Film Actor | Theatre Performer | Film Director",
    bio: "MAZIMPAKA Jones Kennedy is a seasoned Rwandan film actor, theatre performer, and director with over two decades of experience in both international and local productions. His career spans major international feature films, award-recognized projects, television series, and locally acclaimed productions. Kennedy made his international debut in 1998 with a supporting role as a Priest in 100 Days, directed by Nick Hughes. The first international film about the 1994 Genocide against the Tutsi in Rwanda.",
    image: "/images/kennedy.png"
  },
  {
    name: "KAYUMBA VIANNEY (MANZI)",
    role: "Actor | Director | Acting Instructor",
    bio: "Kayumba Vianney (Manzi) is a Rwandan film actor, director, and acting instructor based in Kigali, with over a decade of experience in the East African film industry. Since beginning his career in 2011, he has worked in film production, documentary storytelling, and commercial video projects, collaborating with both local and international filmmakers. Trained in acting for film and television in Arusha, Tanzania (2014–2015), he specializes in screen performance, character development, and emotional storytelling. In addition to acting, he works as a director and creative mentor, contributing to the growth of Rwanda's emerging film industry through filmmaking, training, and creative leadership.",
    image: "/images/vianney.png"
  }
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background">
      <GinNavbar alwaysLight />
      
      <section className="pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1B3A5F] mb-4">
              Our Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the talented professionals shaping the future of film in Rwanda
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-[4/3] relative bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#1B3A5F] mb-2">
                    {member.name}
                  </h2>
                  <p className="text-gold font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GinFooter />
    </main>
  );
}
