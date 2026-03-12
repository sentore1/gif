import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Facebook } from "lucide-react";

export default function GinFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B3A5F] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Global Film Institute"
              width={160}
              height={60}
              className="h-16 w-auto mb-6 brightness-0 invert"
              unoptimized
            />
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Professional film training and international collaboration for the global screen industry.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1B3A5F] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1B3A5F] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1B3A5F] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1B3A5F] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-m mb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/team" className="text-white/70 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors">Programs</Link></li>
              <li><Link href="/partnership" className="text-white/70 hover:text-white transition-colors">Partnership</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-display font-bold text-m mb-2">Programs</h3>
            <ul className="space-y-3">
              <li><Link href="/apply" className="text-white/70 hover:text-white transition-colors">Acting for Film and Theater</Link></li>
              <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors">Certificate Programs</Link></li>
              <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors">Professional Bootcamps</Link></li>
              <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors">Film Production Labs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-m mb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white/70">KN 4 Ave, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <a href="mailto:
globalinvestmentnetworks250@gmail.com
" className="text-white/70 hover:text-white transition-colors">
globalinvestmentnetworks250@gmail.com
</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white flex-shrink-0" />
                <a href="tel:+250784444439" className="text-white/70 hover:text-white transition-colors">+250 784 444 439</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© {currentYear} Global Film Institute. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
