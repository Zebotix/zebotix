import { CheckCircle2, ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Application Received — Careers at ${COMPANY_NAME}`,
  description: "Thank you for applying to Zebotix.",
};

export default function ApplicationSuccessPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center">
        <Reveal>
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Application Received!
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Thank you for taking the time to apply. Your application has been successfully submitted
            to our team. We will review your profile and get back to you if your qualifications
            match our current needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-bold h-12 px-8"
            >
              <Link href="/">Return to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <Link href="/careers/jobs">
                View Other Roles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
