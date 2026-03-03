import GinNavbar from "@/components/gin-navbar";
import GinFooter from "@/components/gin-footer";
import ContactForm from "@/components/contact-form";
import { createClient } from "../../../supabase/server";
import { Mail, Phone, MapPin } from "lucide-react";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <GinNavbar user={user} alwaysLight />
      
      <div className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-navy mb-6">Contact Us</h1>
        <p className="text-lg text-navy/70 leading-relaxed mb-12">
          Get in touch with us to discuss investment opportunities, partnerships, or our services.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-1">Email</h3>
                  <p className="text-navy/70">
globalinvestmentnetworks250@gmail.com
</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-1">Phone</h3>
                  <p className="text-navy/70">+250 784 444 439</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-1">Location</h3>
                  <p className="text-navy/70">KN 4 Ave, Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>

      <GinFooter />
    </div>
  );
}
