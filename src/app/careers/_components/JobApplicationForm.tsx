"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { submitJobApplicationAction } from "@/app/actions/careers";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  resumeUrl: z.string().url("Please enter a valid URL for your resume").or(z.literal("")).optional(),
  portfolioUrl: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  coverLetter: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function JobApplicationForm({ jobId, jobSlug }: { jobId: string; jobSlug: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resumeUrl: "",
      portfolioUrl: "",
      coverLetter: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const result = await submitJobApplicationAction({ ...data, jobId });

    if (!result.success) {
      setServerError(result.error || "Something went wrong. Please try again.");
      return;
    }

    router.push(`/careers/jobs/${jobSlug}/success`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="Jane"
            {...register("firstName")}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="Doe"
            {...register("lastName")}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="jane@example.com"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="resumeUrl" className="block text-sm font-medium text-zinc-300">
          Resume Link (Google Drive, Dropbox, etc.)
        </label>
        <input
          id="resumeUrl"
          type="url"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="https://"
          {...register("resumeUrl")}
        />
        {errors.resumeUrl && <p className="text-red-500 text-xs mt-1">{errors.resumeUrl.message}</p>}
        <p className="text-xs text-zinc-500 mt-1">Make sure the link is publicly accessible.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-zinc-300">
          Portfolio / LinkedIn / GitHub URL
        </label>
        <input
          id="portfolioUrl"
          type="url"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="https://"
          {...register("portfolioUrl")}
        />
        {errors.portfolioUrl && <p className="text-red-500 text-xs mt-1">{errors.portfolioUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="coverLetter" className="block text-sm font-medium text-zinc-300">
          Cover Letter / Message
        </label>
        <textarea
          id="coverLetter"
          rows={5}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
          placeholder="Tell us why you are a good fit for this role..."
          {...register("coverLetter")}
        />
        {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
