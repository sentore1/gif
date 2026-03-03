import Link from "next/link";
import Image from "next/image";
import ApplicationForm from "@/components/application-form";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E4E7EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Global Film Institute"
              width={160}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-navy hover:text-gold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy mb-4">
            Student Application Portal
          </h1>
          <p className="text-[#5F6B7A] max-w-2xl mx-auto">
            Complete the application form below to apply for one of our programs.
            All fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>

        <ApplicationForm />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E4E7EB] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center text-sm text-[#5F6B7A]">
          © {new Date().getFullYear()} Global Film Institute. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
