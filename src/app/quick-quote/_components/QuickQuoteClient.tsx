"use client";

import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import AISuggestions from "./AISuggestions";
import FinalReviewStep from "./FinalReviewStep";
import StickySummary from "./StickySummary";
import { WIZARD_STEPS_CONFIG } from "./WizardSteps";

import { submitQuickQuoteAction } from "@/app/actions/quick-quote";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { quickQuoteSchema, type QuickQuoteInput } from "@/lib/validations";

export default function QuickQuoteClient() {
  const [step, setStep] = useState(0); // 0 to 14
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<QuickQuoteInput>({
    resolver: async (data) => {
      const result = quickQuoteSchema.safeParse(data);
      if (result.success) {
        return { values: result.data, errors: {} };
      } else {
        const errors = result.error.issues.reduce((acc: Record<string, { type: string; message: string }>, issue) => {
          const path = issue.path[0] as string;
          if (path && !acc[path]) {
            acc[path] = { type: issue.code, message: issue.message };
          }
          return acc;
        }, {});
        return { values: {}, errors };
      }
    },
    defaultValues: {
      country: "",
      city: "",
      preferredContact: "",
      projectType: "",
      businessType: "",
      companySize: "",
      projectGoals: "",
      designStyle: [],
      platforms: [],
      features: [],
      aiFeatures: [],
      integrations: [],
      budget: "",
      timeline: "",
      referenceUrls: [],
      attachments: [],
      details: "",
      additionalNotes: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      engagementModel: "",
      estimatedCostPkr: null,
      estimatedCostUsd: null,
    },
  });

  const formData = form.watch();

  const handleSuggestionSelect = (suggestion: string, targetField?: string) => {
    if (!targetField) return;

    const currentValue = form.getValues(targetField as keyof QuickQuoteInput);

    if (Array.isArray(currentValue)) {
      if (currentValue.includes(suggestion)) {
        form.setValue(
          targetField as keyof QuickQuoteInput,
          currentValue.filter((v) => v !== suggestion),
          { shouldValidate: true }
        );
      } else {
        form.setValue(targetField as keyof QuickQuoteInput, [...currentValue, suggestion], {
          shouldValidate: true,
        });
      }
    } else {
      form.setValue(targetField as keyof QuickQuoteInput, suggestion, { shouldValidate: true });
    }
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    const currentStepConfig = WIZARD_STEPS_CONFIG[step];
    if (currentStepConfig && currentStepConfig.fields && currentStepConfig.fields.length > 0) {
      const isValid = await form.trigger(currentStepConfig.fields);
      if (!isValid) return; // Prevent proceeding if validation fails
    }
    
    setStep((s) => {
      let next = s + 1;
      if (next < WIZARD_STEPS_CONFIG.length && WIZARD_STEPS_CONFIG[next].id === "aiFeatures" && form.getValues("wantsAI") === "No") {
        next++;
      }
      return Math.min(next, WIZARD_STEPS_CONFIG.length);
    });
  };

  const prevStep = () => {
    setStep((s) => {
      let prev = s - 1;
      if (prev >= 0 && WIZARD_STEPS_CONFIG[prev].id === "aiFeatures" && form.getValues("wantsAI") === "No") {
        prev--;
      }
      return Math.max(prev, 0);
    });
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

  const isFinalReview = step === WIZARD_STEPS_CONFIG.length;
  const progressPercentage = Math.round((step / WIZARD_STEPS_CONFIG.length) * 100);

  return (
    <div className="text-zinc-300 py-24 relative flex justify-center items-center w-full">
      <div className="absolute inset-0 bg-blue-900/5 blur-[120px] pointer-events-none" />
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {success ? (
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-12 text-center shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <Check className="h-10 w-10" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  Project Request Received
                </h1>
                <p className="text-zinc-400 mb-10 max-w-md mx-auto leading-relaxed text-lg">
                  Thank you for sharing your project requirements. Our solution architects will
                  review your specifications and contact you shortly to schedule a discovery call.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                  >
                    <Link href="/">Return Home</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 font-bold h-12 px-8 rounded-xl transition-all"
                  >
                    <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noreferrer">
                      WhatsApp Us Now
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          <div className={`flex flex-col lg:flex-row gap-8 ${step === 0 ? "justify-center" : ""}`}>
            <div
              className={`flex-1 order-2 lg:order-1 ${step === 0 ? "max-w-4xl w-full mx-auto" : "w-full"}`}
            >
              <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative min-h-[600px] flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Header progress info */}
                <div className="flex justify-between items-center mb-8 border-b border-zinc-800/50 pb-6">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
                    Step {step + 1} of {WIZARD_STEPS_CONFIG.length + 1}
                  </span>
                  <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-blue-400 h-full absolute left-0 top-0 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400 text-sm flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {error}
                  </div>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col relative z-10"
                  >
                    <div className="flex-1">
                      {!isFinalReview ? (
                        <>
                          {React.createElement(WIZARD_STEPS_CONFIG[step].component, {
                            form,
                            onNext: nextStep,
                            onPrev: prevStep,
                          })}

                          {/* Only show AI suggestions on specific steps based on config */}
                          {WIZARD_STEPS_CONFIG[step].showAISuggestions && (
                            <AISuggestions formData={formData} onSelect={handleSuggestionSelect} />
                          )}
                        </>
                      ) : (
                        <FinalReviewStep form={form} />
                      )}
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-800/50 flex justify-between items-center">
                      {step > 0 ? (
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={prevStep}
                          className="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl px-4 py-2 transition-colors font-bold text-sm"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                      ) : (
                        <div />
                      )}

                      {!isFinalReview ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-white text-zinc-950 hover:bg-zinc-200 font-bold h-12 px-8 flex items-center gap-2 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                        >
                          Next <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isPending}
                          className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold h-12 px-8 flex items-center gap-2 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                          {isPending ? "Submitting..." : "Submit Specifications"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* Sticky Summary Panel (Hidden on first step and final step) */}
            {step > 0 && !isFinalReview && (
              <div className="w-full lg:w-80 order-1 lg:order-2">
                <StickySummary formData={formData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
