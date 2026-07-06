import { ArrowLeft, Briefcase, MapPin, Clock } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { getActiveJobPostingsAction } from "@/app/actions/careers";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Open Roles — Careers at ${COMPANY_NAME}`,
  description: `View and apply for open roles at ${COMPANY_NAME}. Join our remote-first team.`,
  alternates: {
    canonical: `${SITE_URL}/careers/jobs`,
  },
};

export default async function JobPostingsPage() {
  const result = await getActiveJobPostingsAction();
  const jobs = result.success && result.data ? result.data : [];

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mb-12">
            <Button asChild variant="ghost" className="mb-6 -ml-4 text-zinc-400">
              <Link href="/careers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Open Roles</h1>
            <p className="text-zinc-400 text-lg">
              Find your next opportunity and help us build amazing digital products.
            </p>
          </div>
        </Reveal>

        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.05}>
                <Link
                  href={`/careers/jobs/${job.slug}`}
                  className="block bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-zinc-700 hover:bg-white hover:text-black"
                      >
                        View Role
                      </Button>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1}>
            <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Open Roles Currently</h3>
              <p className="text-zinc-400 max-w-md mx-auto mb-8">
                We are not actively hiring right now, but we are always looking to connect with
                great talent. Check back later or follow us on our social channels for updates.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
