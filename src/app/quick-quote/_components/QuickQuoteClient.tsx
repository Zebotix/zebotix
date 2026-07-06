"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { submitQuickQuoteAction } from "@/app/actions/quick-quote";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { quickQuoteSchema, type QuickQuoteInput } from "@/lib/validations";

export default function QuickQuoteClient() {
  const [step, setStep] = useState(1);
  const [refUrlInput, setRefUrlInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<QuickQuoteInput>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      projectType: "",
      businessType: "",
      colorThemes: [],
      features: [],
      budget: "",
      timeline: "",
      details: "",
      referenceUrls: [],
      attachments: [],
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const formData = form.watch();

  const nextStep = () => setStep((s) => Math.min(s + 1, 8));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSelectOne = (
    field: "projectType" | "businessType" | "budget" | "timeline",
    value: string
  ) => {
    form.setValue(field, value, { shouldValidate: true });
    nextStep();
  };

  const handleMultiSelect = (field: "colorThemes" | "features", value: string) => {
    const list = form.getValues(field) || [];
    const newList = list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
    form.setValue(field, newList, { shouldValidate: true });
  };

  const handleAddRefUrl = () => {
    if (refUrlInput.trim()) {
      form.setValue("referenceUrls", [
        ...(form.getValues("referenceUrls") || []),
        refUrlInput.trim(),
      ]);
      setRefUrlInput("");
    }
  };

  const handleRemoveRefUrl = (index: number) => {
    const urls = form.getValues("referenceUrls") || [];
    form.setValue(
      "referenceUrls",
      urls.filter((_, idx) => idx !== index)
    );
  };

  const onSubmit = (data: QuickQuoteInput) => {
    setError("");

    startTransition(async () => {
      const res = await submitQuickQuoteAction(data);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "Something went wrong. Please check fields.");
      }
    });
  };

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-6">
        {success ? (
          <Reveal>
            <div className="bg-zinc-900 border border-zinc-800 p-12 text-center shadow-2xl">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-black text-white mb-4">Quote Requested!</h1>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Thank you for submiting your digital specifications. Our software architects will
                review your project and get back to you with a roadmap within 24 hours.
              </p>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 rounded-none"
              >
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl relative">
            {/* Header progress info */}
            <div className="flex justify-between items-center mb-8 border-b border-zinc-850 pb-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" /> Step {step} of 8
              </span>
              <div className="w-32 h-1 bg-zinc-800 relative">
                <div
                  className="bg-blue-500 h-full absolute left-0 top-0 transition-all duration-300"
                  style={{ width: `${(step / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div className="mb-6 p-4 bg-red-950/30 border border-red-900 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* WIZARD STEPS */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Project Type */}
                {step === 1 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
                      What type of project are we building?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Website",
                        "Web App",
                        "School ERP",
                        "AI Automation",
                        "E-commerce Platform",
                        "Other",
                      ].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          onClick={() => handleSelectOne("projectType", type)}
                          className={cn(
                            "text-left p-5 border transition-all duration-200 font-bold h-auto rounded-none w-full justify-start",
                            formData.projectType === type
                              ? "border-blue-500 bg-blue-500/10 text-white"
                              : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                          )}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </Reveal>
                )}

                {/* Step 2: Business Type */}
                {step === 2 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
                      What is your industry/business type?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "School / Education",
                        "Hospital / MedTech",
                        "Restaurant / Food",
                        "Real Estate",
                        "Retail / E-commerce",
                        "Tech Startup",
                        "Other",
                      ].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          onClick={() => handleSelectOne("businessType", type)}
                          className={cn(
                            "text-left p-5 border transition-all duration-200 font-bold h-auto rounded-none w-full justify-start",
                            formData.businessType === type
                              ? "border-blue-500 bg-blue-500/10 text-white"
                              : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                          )}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </Reveal>
                )}

                {/* Step 3: Color Themes */}
                {step === 3 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      Select your design/color preferences
                    </h2>
                    <p className="text-zinc-500 text-sm mb-8">
                      Choose all themes that align with your brand persona.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Minimal & Clean",
                        "Dark Mode Default",
                        "Luxury & High-end",
                        "Corporate & Trustworthy",
                        "Modern & Vibrant",
                        "Elegant & Classical",
                      ].map((theme) => {
                        const isSelected = formData.colorThemes?.includes(theme);
                        return (
                          <Button
                            key={theme}
                            type="button"
                            variant="outline"
                            onClick={() => handleMultiSelect("colorThemes", theme)}
                            className={cn(
                              "text-left p-5 border transition-all duration-200 font-bold flex justify-between items-center h-auto rounded-none w-full",
                              isSelected
                                ? "border-blue-500 bg-blue-500/5 text-white"
                                : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                            )}
                          >
                            <span>{theme}</span>
                            {isSelected && <Check className="h-5 w-5 text-blue-500" />}
                          </Button>
                        );
                      })}
                    </div>
                  </Reveal>
                )}

                {/* Step 4: Features */}
                {step === 4 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      What features are required?
                    </h2>
                    <p className="text-zinc-500 text-sm mb-8">
                      Select all required digital modules.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "User Authentication",
                        "Admin Dashboard / CMS",
                        "Payment Gateway Integration",
                        "Inventory Management",
                        "Advanced Reports & Analytics",
                        "Blog / Resources Section",
                        "AI Integration / LLM Agents",
                      ].map((feat) => {
                        const isSelected = formData.features?.includes(feat);
                        return (
                          <Button
                            key={feat}
                            type="button"
                            variant="outline"
                            onClick={() => handleMultiSelect("features", feat)}
                            className={cn(
                              "text-left p-4 border transition-all duration-200 text-sm font-bold flex justify-between items-center h-auto rounded-none w-full",
                              isSelected
                                ? "border-blue-500 bg-blue-500/5 text-white"
                                : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400"
                            )}
                          >
                            <span>{feat}</span>
                            {isSelected && <Check className="h-4 w-4 text-blue-500" />}
                          </Button>
                        );
                      })}
                    </div>
                  </Reveal>
                )}

                {/* Step 5: Budget */}
                {step === 5 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
                      What is your budget size?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "$500 - $1,000",
                        "$1,000 - $3,000",
                        "$3,000 - $5,000",
                        "$5,000+ / Enterprise Custom",
                      ].map((bud) => (
                        <Button
                          key={bud}
                          type="button"
                          variant="outline"
                          onClick={() => handleSelectOne("budget", bud)}
                          className={cn(
                            "text-left p-5 border transition-all duration-200 font-bold h-auto rounded-none w-full justify-start",
                            formData.budget === bud
                              ? "border-blue-500 bg-blue-500/10 text-white"
                              : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                          )}
                        >
                          {bud}
                        </Button>
                      ))}
                    </div>
                  </Reveal>
                )}

                {/* Step 6: Timeline */}
                {step === 6 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
                      What is your expected timeline?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Urgent Launch (< 2 weeks)",
                        "Standard Launch (1 month)",
                        "Custom Scope (2+ months)",
                        "Flexible Schedule",
                      ].map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant="outline"
                          onClick={() => handleSelectOne("timeline", time)}
                          className={cn(
                            "text-left p-5 border transition-all duration-200 font-bold h-auto rounded-none w-full justify-start",
                            formData.timeline === time
                              ? "border-blue-500 bg-blue-500/10 text-white"
                              : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
                          )}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </Reveal>
                )}

                {/* Step 7: Details & References */}
                {step === 7 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                      Additional Specifications
                    </h2>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium text-zinc-400">
                              Project Details
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={4}
                                className="w-full bg-zinc-950 border border-zinc-850 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 resize-none rounded-none"
                                placeholder="Tell us about complex rules, specific endpoints, integrations..."
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <label
                          htmlFor="reference-website-url"
                          className="block text-sm font-medium text-zinc-400 mb-2"
                        >
                          Reference Website URLs
                        </label>
                        <div className="flex gap-2">
                          <Input
                            id="reference-website-url"
                            type="url"
                            value={refUrlInput}
                            onChange={(e) => setRefUrlInput(e.target.value)}
                            className="flex-1 bg-zinc-950 border border-zinc-850 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-none"
                            placeholder="https://example.com"
                          />
                          <Button
                            type="button"
                            onClick={handleAddRefUrl}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 font-bold text-sm rounded-none"
                          >
                            Add URL
                          </Button>
                        </div>
                        {formData.referenceUrls && formData.referenceUrls.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {formData.referenceUrls.map((url, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center bg-zinc-950 p-2.5 border border-zinc-850 text-xs"
                              >
                                <span className="text-zinc-400 truncate max-w-md">{url}</span>
                                <Button
                                  variant="link"
                                  type="button"
                                  onClick={() => handleRemoveRefUrl(idx)}
                                  className="text-red-500 font-bold hover:underline p-0 h-auto"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Step 8: Contact Info */}
                {step === 8 && (
                  <Reveal>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                      Who are we contacting?
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium text-zinc-400">
                                Full Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="w-full bg-zinc-950 border border-zinc-850 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-none"
                                  placeholder="John Doe"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium text-zinc-400">
                                Email Address *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  className="w-full bg-zinc-950 border border-zinc-850 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-none"
                                  placeholder="john@company.com"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium text-zinc-400">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  {...field}
                                  value={field.value || ""}
                                  className="w-full bg-zinc-950 border border-zinc-850 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-none"
                                  placeholder="+1 (555) 000-0000"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium text-zinc-400">
                                Company / Organization
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value || ""}
                                  className="w-full bg-zinc-950 border border-zinc-850 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-none"
                                  placeholder="Acme Corp"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Back / Next navigation bar */}
                <div className="mt-12 pt-8 border-t border-zinc-850 flex justify-between">
                  {step > 1 ? (
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-wider"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 8 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (step === 1 && !formData.projectType) ||
                        (step === 2 && !formData.businessType) ||
                        (step === 5 && !formData.budget) ||
                        (step === 6 && !formData.timeline)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 flex items-center gap-2 disabled:opacity-50 border-none rounded-none"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isPending || !formData.name || !formData.email}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 flex items-center gap-2 disabled:opacity-50 border-none rounded-none"
                    >
                      {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isPending ? "Submitting..." : "Submit Specifications"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </main>
  );
}
