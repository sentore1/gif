import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Global Film Institute"
              width={180}
              height={70}
              className="h-20 w-auto mx-auto"
              unoptimized
            />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E7EB] p-8 shadow-[0_8px_24px_rgba(27,58,95,0.12)]">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="font-display text-3xl font-bold text-navy">
                Welcome Back
              </h1>
              <p className="text-sm text-[#5F6B7A]">
                Don&apos;t have an account?{" "}
                <Link
                  className="text-gold font-medium hover:underline transition-all"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-navy">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-navy">
                    Password
                  </Label>
                  <Link
                    className="text-xs text-[#5F6B7A] hover:text-gold hover:underline transition-all"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full bg-navy hover:bg-navy/90 text-white"
              pendingText="Signing in..."
              formAction={signInAction}
            >
              Sign in
            </SubmitButton>

            <FormMessage message={message} />
          </form>
        </div>

        <p className="text-center text-sm text-[#5F6B7A] mt-6">
          <Link href="/" className="hover:text-gold transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
