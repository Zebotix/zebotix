import { ArrowLeft, Briefcase, MapPin, Clock, CalendarDays } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JobApplicationForm from "../../_components/JobApplicationForm";

import { getJobPostingBySlugAction } from "@/app/actions/careers";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import {
  generateJobPostingSchema,
  getSanitizedSchema,
  generateBreadcrumbSchema,
} from "@/lib/schemas";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getJobPostingBySlugAction(slug);
  const job = result.success && result.data ? result.data : null;

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} — Careers at ${COMPANY_NAME}`,
    description: job.description.substring(0, 160),
  };
}

export default async function JobDetailPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const result = await getJobPostingBySlugAction(slug);
  const job = result.success && result.data ? result.data : null;

  if (!job) {
    notFound();
  }

  const requirements = job.requirements as string[] | null;
  const responsibilities = job.responsibilities as string[] | null;
  const benefits = job.benefits as string[] | null;

  const jobSchema = generateJobPostingSchema(
    job.title,
    job.description,
    new Date(job.createdAt),
    job.location,
    job.type
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Careers", url: `${SITE_URL}/careers` },
    { name: "Jobs", url: `${SITE_URL}/careers/jobs` },
    { name: job.title, url: `${SITE_URL}/careers/jobs/${job.slug}` },
  ]);

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(jobSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(breadcrumbSchema),
        }}
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal>
          <Button asChild variant="ghost" className="mb-8 -ml-4 text-zinc-400 hover:text-white">
            <Link href="/careers/jobs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Open Roles
            </Link>
          </Button>

          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-zinc-400 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">{job.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-12 mb-16">
          <Reveal delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold mb-4">About the Role</h2>
              <div
                className="text-zinc-400 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>
          </Reveal>

          {responsibilities && responsibilities.length > 0 && (
            <Reveal delay={0.15}>
              <section>
                <h2 className="text-2xl font-bold mb-4">What you'll do</h2>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400 leading-relaxed marker:text-blue-500">
                  {responsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {requirements && requirements.length > 0 && (
            <Reveal delay={0.2}>
              <section>
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400 leading-relaxed marker:text-blue-500">
                  {requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {benefits && benefits.length > 0 && (
            <Reveal delay={0.25}>
              <section>
                <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400 leading-relaxed marker:text-blue-500">
                  {benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.3}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1)_0%,transparent_100%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-2">Apply for this position</h2>
              <p className="text-zinc-400 mb-8">
                Please fill out the form below and we'll get back to you shortly.
              </p>

              <JobApplicationForm jobId={job.id} jobSlug={job.slug} />
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
