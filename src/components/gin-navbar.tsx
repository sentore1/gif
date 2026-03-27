"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GinNavbarProps {
  user?: { email?: string } | null;
  alwaysLight?: boolean;
}

export default function GinNavbar({ user, alwaysLight = false }: GinNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/partnership", label: "Partnership" },
    { href: "/contact", label: "Contact" },
  ];

  const aboutDropdown = [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Our Team" },
  ];

  const programs = [
    { href: "/programs", label: "All Programs" },
    { href: "#afa", label: "Acting for Film and Theater" },
    { href: "/programs#labs", label: "Film Production Labs" },
    { href: "/apply", label: "Apply Now" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || alwaysLight
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Global Film Institute"
              width={140}
              height={50}
              className={`h-12 w-auto object-contain transition-all ${
                isScrolled || alwaysLight ? "" : "brightness-0 invert"
              }`}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isScrolled || alwaysLight ? "text-[#1B3A5F] hover:text-gold" : "text-white hover:text-gold"
              }`}>
                About
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-[#1B3A5F] hover:bg-secondary hover:text-gold transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProgramsOpen(true)}
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isScrolled || alwaysLight ? "text-[#1B3A5F] hover:text-gold" : "text-white hover:text-gold"
              }`}>
                Programs
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isProgramsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isProgramsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {programs.map((program) => (
                      <Link
                        key={program.href}
                        href={program.href}
                        className="block px-4 py-2 text-sm text-[#1B3A5F] hover:bg-secondary hover:text-gold transition-colors"
                      >
                        {program.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled || alwaysLight ? "text-[#1B3A5F] hover:text-gold" : "text-white hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-[#1B3A5F] hover:bg-[#1B3A5F]/90 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={`text-sm font-medium transition-colors ${
                    isScrolled || alwaysLight ? "text-[#1B3A5F] hover:text-gold" : "text-white hover:text-gold"
                  }`}
                >
                  Sign In
                </Link>
                <Link href="/apply">
                  <Button className="bg-[#1B3A5F] hover:bg-[#1B3A5F]/90 text-white active:scale-[0.98] transition-transform">
                    Apply Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden ${
              isScrolled || alwaysLight ? "text-[#1B3A5F]" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-20 right-0 bottom-0 w-80 bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <div className="border-b border-border pb-4">
                <p className="text-sm text-muted-foreground mb-2">About</p>
                {aboutDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-[#1B3A5F] hover:text-gold transition-colors py-2 pl-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-[#1B3A5F] hover:text-gold transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-border pt-4 mt-2">
                <p className="text-sm text-muted-foreground mb-2">Programs</p>
                {programs.map((program) => (
                  <Link
                    key={program.href}
                    href={program.href}
                    className="block text-[#1B3A5F] hover:text-gold transition-colors py-2 pl-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {program.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {user ? (
                  <Link href="/dashboard">
                    <Button className="w-full bg-[#1B3A5F] hover:bg-[#1B3A5F]/90 text-white">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button
                        variant="outline"
                        className="w-full border-[#1B3A5F] text-[#1B3A5F]"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/apply">
                      <Button className="w-full bg-[#1B3A5F] hover:bg-[#1B3A5F]/90 text-white">
                        Apply Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
