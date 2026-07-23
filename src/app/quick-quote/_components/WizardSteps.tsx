import { Check, UploadCloud, Info } from "lucide-react";
import React from "react";
import { type UseFormReturn } from "react-hook-form";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
// import {
//   PROJECT_TYPES_MAPPING,
//   PLATFORMS_MAPPING,
//   FEATURES_MAPPING,
//   AI_FEATURES_MAPPING,
//   INTEGRATIONS_MAPPING,
// } from "@/config/estimator-mapping";
import pricing from "@/config/pricing-international.json";
import { cn } from "@/lib/utils";
import { type QuickQuoteInput } from "@/lib/validations";

interface StepProps {
  form: UseFormReturn<QuickQuoteInput>;
  onNext: () => void;
  onPrev: () => void;
}

// Pricing options are identical between regions, so we just use the international one for keys.

export function CountryStep({ form, onNext }: StepProps) {
  const countries = [
    "Pakistan",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Saudi Arabia",
    "UAE",
    "Germany",
    "Other",
  ];
  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
        Where are you located?
      </h2>
      <p className="text-zinc-400 mb-8 text-lg">
        This helps us customize your experience and estimation currency.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <Button
            key={country}
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue("country", country);
              onNext();
            }}
            className={cn(
              "text-left p-5 border transition-all duration-300 font-bold h-auto rounded-xl w-full justify-start",
              form.watch("country") === country
                ? "border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                : "border-zinc-700/50 hover:border-zinc-500 bg-zinc-900/50 text-zinc-400 hover:text-white"
            )}
          >
            {country}
          </Button>
        ))}
      </div>
    </Reveal>
  );
}

export function BasicInfoStep({ form }: StepProps) {
  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight">
        Basic Information
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 font-medium">Full Name *</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12"
                    {...field}
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
                <FormLabel className="text-zinc-400 font-medium">Company Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12"
                    {...field}
                    value={field.value || ""}
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
                <FormLabel className="text-zinc-400 font-medium">Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 font-medium">City</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 font-medium">
                  Preferred Contact Method
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12">
                      <SelectValue placeholder="Select a method..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Zoom">Zoom</SelectItem>
                    <SelectItem value="Google Meet">Google Meet</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Reveal>
  );
}

export function SingleSelectGrid({
  form,
  onNext,
  field,
  options,
  title,
  subtitle,
  microcopy,
}: {
  form: UseFormReturn<QuickQuoteInput>;
  onNext?: () => void;
  field: keyof QuickQuoteInput;
  options: (
    | string
    | {
        key: string;
        label: string;
        description?: string;
        technicalDetails?: React.ReactNode;
        badge?: string;
      }
  )[];
  title: string;
  subtitle?: string;
  microcopy?: string;
}) {
  const error = form.formState.errors[field]?.message as string | undefined;
  const [expandedDetails, setExpandedDetails] = React.useState<string | null>(null);

  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mb-2 text-lg">{subtitle}</p>}
      {microcopy && (
        <div className="mb-8 flex items-start gap-3 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-blue-200 text-sm leading-relaxed">{microcopy}</p>
        </div>
      )}
      {!microcopy && <div className="mb-8" />}

      {error && (
        <p className="text-red-400 text-sm font-medium mb-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((optItem) => {
          const isString = typeof optItem === "string";
          const key = isString ? optItem : optItem.key;
          const label = isString ? optItem : optItem.label;
          const description = isString ? null : optItem.description;
          const technicalDetails = isString ? null : optItem.technicalDetails;
          const badge = isString ? null : optItem.badge;

          const isSelected = form.watch(field) === key;
          const isExpanded = expandedDetails === key;

          return (
            <div key={key} className="relative flex flex-col">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.setValue(field, key, { shouldValidate: true });
                  if (onNext) onNext();
                }}
                className={cn(
                  "text-left p-6 border transition-all duration-300 h-auto rounded-xl w-full flex-col items-start relative overflow-hidden group whitespace-normal",
                  isSelected
                    ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "border-zinc-700/50 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-800/60"
                )}
              >
                {badge && (
                  <span
                    className={cn(
                      "absolute top-0 right-0 text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl shadow-lg",
                      badge === "Recommended"
                        ? "bg-emerald-500/20 text-emerald-400 border-b border-l border-emerald-500/30"
                        : badge === "Most Popular"
                          ? "bg-blue-500/20 text-blue-400 border-b border-l border-blue-500/30"
                          : badge === "Enterprise"
                            ? "bg-purple-500/20 text-purple-400 border-b border-l border-purple-500/30"
                            : "bg-zinc-700/50 text-zinc-300 border-b border-l border-zinc-600/50"
                    )}
                  >
                    {badge}
                  </span>
                )}
                <span
                  className={cn(
                    "text-lg font-black transition-colors pr-8",
                    isSelected ? "text-blue-400" : "text-white"
                  )}
                >
                  {label}
                </span>
                {description && (
                  <span className="text-zinc-400 font-normal text-sm mt-2 leading-relaxed">
                    {description}
                  </span>
                )}
              </Button>

              {technicalDetails && (
                <div className="mt-2 w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setExpandedDetails(isExpanded ? null : key);
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 font-medium px-2 py-1 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    {isExpanded ? "Hide Technical Details" : "Show Technical Details"}
                  </button>
                  {isExpanded && (
                    <div className="mt-2 p-3 bg-zinc-950/50 border border-zinc-800/50 rounded-lg text-xs text-zinc-400 font-mono leading-relaxed">
                      <span className="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">
                        Architecture / Stack
                      </span>
                      {technicalDetails}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

export function MultiSelectGrid({
  form,
  field,
  options,
  title,
  subtitle,
  microcopy,
}: {
  form: UseFormReturn<QuickQuoteInput>;
  field: keyof QuickQuoteInput;
  options: (
    | string
    | {
        key: string;
        label: string;
        description?: string;
        technicalDetails?: React.ReactNode;
        badge?: string;
      }
  )[];
  title: string;
  subtitle?: string;
  microcopy?: string;
}) {
  const current = (form.watch(field) as string[]) || [];
  const error = form.formState.errors[field]?.message as string | undefined;
  const [expandedDetails, setExpandedDetails] = React.useState<string | null>(null);

  const toggle = (val: string) => {
    const next = current.includes(val)
      ? current.filter((x: string) => x !== val)
      : [...current, val];
    form.setValue(field, next, { shouldValidate: true });
  };

  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mb-2 text-lg">{subtitle}</p>}
      {microcopy && (
        <div className="mb-8 flex items-start gap-3 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-blue-200 text-sm leading-relaxed">{microcopy}</p>
        </div>
      )}
      {!microcopy && <div className="mb-8" />}

      {error && (
        <p className="text-red-400 text-sm font-medium mb-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((optItem) => {
          const isString = typeof optItem === "string";
          const key = isString ? optItem : optItem.key;
          const label = isString ? optItem : optItem.label;
          const description = isString ? null : optItem.description;
          const technicalDetails = isString ? null : optItem.technicalDetails;
          const badge = isString ? null : optItem.badge;

          const isSelected = current.includes(key);
          const isExpanded = expandedDetails === key;

          return (
            <div key={key} className="relative flex flex-col">
              <Button
                type="button"
                variant="outline"
                onClick={() => toggle(key)}
                className={cn(
                  "text-left p-5 border transition-all duration-300 h-auto rounded-xl w-full flex-col items-start relative overflow-hidden group whitespace-normal",
                  isSelected
                    ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "border-zinc-700/50 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-800/60"
                )}
              >
                {badge && (
                  <span
                    className={cn(
                      "absolute top-0 right-0 text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl shadow-lg",
                      badge === "Recommended"
                        ? "bg-emerald-500/20 text-emerald-400 border-b border-l border-emerald-500/30"
                        : badge === "Most Popular"
                          ? "bg-blue-500/20 text-blue-400 border-b border-l border-blue-500/30"
                          : badge === "Enterprise"
                            ? "bg-purple-500/20 text-purple-400 border-b border-l border-purple-500/30"
                            : "bg-zinc-700/50 text-zinc-300 border-b border-l border-zinc-600/50"
                    )}
                  >
                    {badge}
                  </span>
                )}
                <div className="flex justify-between items-start w-full gap-2">
                  <span
                    className={cn(
                      "text-lg font-black transition-colors pr-6",
                      isSelected ? "text-blue-400" : "text-white"
                    )}
                  >
                    {label}
                  </span>
                  {isSelected && (
                    <Check className="h-5 w-5 text-blue-400 shrink-0 mt-0.5 absolute right-4 top-5" />
                  )}
                </div>
                {description && (
                  <span className="text-zinc-400 font-normal text-sm mt-2 leading-relaxed">
                    {description}
                  </span>
                )}
              </Button>

              {technicalDetails && (
                <div className="mt-2 w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setExpandedDetails(isExpanded ? null : key);
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 font-medium px-2 py-1 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    {isExpanded ? "Hide Technical Details" : "Show Technical Details"}
                  </button>
                  {isExpanded && (
                    <div className="mt-2 p-3 bg-zinc-950/50 border border-zinc-800/50 rounded-lg text-xs text-zinc-400 font-mono leading-relaxed">
                      <span className="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">
                        Architecture / Stack
                      </span>
                      {technicalDetails}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

export function ReferencesStep({ form }: StepProps) {
  const [url, setUrl] = React.useState("");
  const urls = form.watch("referenceUrls") || [];

  const addUrl = () => {
    if (url.trim()) {
      form.setValue("referenceUrls", [...urls, url.trim()]);
      setUrl("");
    }
  };

  const removeUrl = (idx: number) => {
    form.setValue(
      "referenceUrls",
      urls.filter((_, i) => i !== idx)
    );
  };

  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
        References & Files
      </h2>
      <p className="text-zinc-400 mb-8 text-lg">
        Share links to designs, competitors, or files (PDFs/Images)
      </p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Add Reference URLs (Figma, Dribbble, Competitors)
          </label>
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl focus-visible:ring-blue-500 h-12"
            />
            <Button
              type="button"
              onClick={addUrl}
              className="bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700/50 rounded-xl text-white font-bold h-12 px-6"
            >
              Add URL
            </Button>
          </div>
          {urls.length > 0 && (
            <div className="mt-4 space-y-2">
              {urls.map((u, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-700/50"
                >
                  <span className="text-zinc-300 text-sm">{u}</span>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => removeUrl(idx)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-950/30 text-xs font-bold uppercase tracking-wider h-auto py-1 px-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800/50 pt-8">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Upload Files (Optional)
          </label>
          <div className="border-2 border-dashed border-zinc-700/50 rounded-xl p-8 text-center bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
            <UploadCloud className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium mb-2">File upload will be enabled soon.</p>
            <p className="text-zinc-500 text-sm">
              For now, please use the URL reference field above.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function TextareaStep({
  form,
  field,
  title,
  subtitle,
  microcopy,
  placeholder,
}: {
  form: UseFormReturn<QuickQuoteInput>;
  field: keyof QuickQuoteInput;
  title: string;
  subtitle?: string;
  microcopy?: string;
  placeholder?: string;
}) {
  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mb-2 text-lg">{subtitle}</p>}
      {microcopy && (
        <div className="mb-8 flex items-start gap-3 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-blue-200 text-sm leading-relaxed">{microcopy}</p>
        </div>
      )}
      {!microcopy && <div className="mb-8" />}
      <FormField
        control={form.control}
        name={field}
        render={({ field: fProps }) => (
          <FormItem>
            <FormControl>
              <Textarea
                rows={6}
                className="bg-zinc-900/50 border-zinc-700/50 text-white rounded-xl resize-none focus-visible:ring-blue-500 p-4"
                placeholder={placeholder}
                {...fProps}
                value={fProps.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Reveal>
  );
}

export function EngagementModelStep({ form, onNext }: StepProps) {
  const model = form.watch("engagementModel");

  return (
    <Reveal>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
        How would you like to build your project?
      </h2>
      <p className="text-zinc-400 mb-8 text-lg">
        Choose the option that best matches your budget and preferred way of working. This selection
        only helps us prepare a more suitable quotation. No payment is required at this stage.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.setValue("engagementModel", "One-Time Project");
            onNext();
          }}
          className={cn(
            "text-left p-6 border transition-all duration-300 rounded-2xl w-full flex flex-col items-start h-auto relative overflow-hidden group whitespace-normal",
            model === "One-Time Project"
              ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              : "border-zinc-700/50 hover:border-zinc-500 bg-zinc-900/40 hover:bg-zinc-800/60"
          )}
        >
          <div className="mb-4 text-white font-black text-xl flex items-center gap-2">
            One-Time Project
          </div>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Best for clients who already have a defined budget and want the complete project
            delivered under one quotation.
          </p>
          <div className="mt-auto space-y-2 w-full">
            <h5 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">
              Benefits
            </h5>
            {[
              "Single project quotation",
              "Fixed scope",
              "Simple process",
              "Best for small and medium projects",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 mt-1.5 bg-blue-500 rounded-full shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.setValue("engagementModel", "Milestone-Based Development");
            onNext();
          }}
          className={cn(
            "text-left p-6 border transition-all duration-300 rounded-2xl w-full flex flex-col items-start h-auto relative overflow-hidden group whitespace-normal",
            model === "Milestone-Based Development"
              ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "border-zinc-700/50 hover:border-zinc-500 bg-zinc-900/40 hover:bg-zinc-800/60"
          )}
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-bl-lg">
            Recommended
          </div>
          <div className="mb-4 text-white font-black text-xl flex items-center gap-2">
            Milestone-Based Development
          </div>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Your project is divided into smaller phases (called milestones). You pay separately for
            each completed phase instead of paying the full amount upfront.
          </p>
          <div className="mt-auto space-y-2 w-full">
            <h5 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">
              Benefits
            </h5>
            {[
              "Lower upfront investment",
              "Easier budgeting",
              "Review progress after every phase",
              "Reduced financial risk",
              "Ideal for growing businesses",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 mt-1.5 bg-emerald-500 rounded-full shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </Button>
      </div>

      <div className="mt-8 bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          What is a Milestone?
        </h4>
        <p className="text-zinc-400 text-sm leading-relaxed">
          A milestone is one major phase of your project. For example: <strong>Milestone 1</strong>{" "}
          (Planning & Setup), <strong>Milestone 2</strong> (Core Development),{" "}
          <strong>Milestone 3</strong> (Advanced Features). Each milestone has its own deliverables,
          timeline and agreed investment.
        </p>
      </div>
    </Reveal>
  );
}

export interface WizardStepConfig {
  id: string;
  component: React.ComponentType<StepProps>;
  showAISuggestions?: boolean;
  fields: (keyof QuickQuoteInput)[];
}

export const WIZARD_STEPS_CONFIG: WizardStepConfig[] = [
  { id: "country", component: CountryStep, fields: ["country"] },
  {
    id: "basic",
    component: BasicInfoStep,
    fields: ["name", "email", "phone", "company", "city", "preferredContact"],
  },
  {
    id: "projectType",
    component: (props: StepProps) => (
      <SingleSelectGrid
        {...props}
        field="projectType"
        title="What type of software are you building?"
        subtitle="Select the category that best describes your project."
        options={Object.keys(pricing.projectTypes)}
        onNext={props.onNext}
      />
    ),
    fields: ["projectType"],
  },
  {
    id: "businessType",
    component: (props: StepProps) => (
      <SingleSelectGrid
        {...props}
        field="businessType"
        title="What industry is your business in?"
        subtitle="This helps us understand your market and recommend industry-specific features."
        options={[
          "Education",
          "Healthcare",
          "Retail",
          "Restaurant",
          "Construction",
          "Finance",
          "Agency",
          "Government",
          "Startup",
          "Other",
        ]}
        onNext={props.onNext}
      />
    ),
    fields: ["businessType"],
  },
  {
    id: "companySize",
    component: (props: StepProps) => (
      <SingleSelectGrid
        {...props}
        field="companySize"
        title="How large is your organization?"
        subtitle="This helps us determine the scale and support level you might need."
        options={[
          "Individual",
          "Startup",
          "Small Business",
          "Medium Business",
          "Enterprise",
          "Government",
        ]}
        onNext={props.onNext}
      />
    ),
    fields: ["companySize"],
  },
  {
    id: "projectGoals",
    component: (props: StepProps) => (
      <TextareaStep
        {...props}
        field="projectGoals"
        title="What is the main goal for this project?"
        subtitle="Tell us a little bit about what you're trying to achieve. Don't worry about technical terms—just explain the business problem."
        microcopy="Understanding your business goals helps us recommend the most cost-effective and powerful solutions."
        placeholder="E.g., We want to stop tracking orders on paper and need a system our team can use on their phones..."
      />
    ),
    showAISuggestions: true,
    fields: ["projectGoals"],
  },
  {
    id: "platforms",
    component: (props: StepProps) => (
      <MultiSelectGrid
        {...props}
        field="platforms"
        title="Where will your users access this software?"
        subtitle="Select all the platforms you need (e.g., Web, iOS, Android)."
        options={Object.keys(pricing.platforms)}
      />
    ),
    showAISuggestions: true,
    fields: ["platforms"],
  },
  {
    id: "designStyle",
    component: (props: StepProps) => (
      <MultiSelectGrid
        {...props}
        field="designStyle"
        title="How should the software look and feel?"
        subtitle="Select the design styles that best match your brand identity."
        microcopy="Design isn't just about looking good—it's about building trust with your specific audience."
        options={[
          {
            key: "Minimal",
            label: "Clean & Minimal",
            description: "Simple, lots of white space, easy to use.",
          },
          {
            key: "Corporate",
            label: "Professional & Corporate",
            description: "Trustworthy, structured, standard business look.",
          },
          {
            key: "Luxury",
            label: "Premium & Luxury",
            description: "High-end, sophisticated, perfect for premium brands.",
          },
          {
            key: "Modern",
            label: "Modern & Tech-Focused",
            description: "Sleek, colorful, engaging.",
          },
          {
            key: "Apple Style",
            label: "Apple-like (Glass & Blurs)",
            description: "Extremely smooth, translucent elements.",
          },
          {
            key: "Animated",
            label: "Highly Animated",
            description: "Lots of movement, dynamic scrolling effects.",
          },
        ]}
      />
    ),
    showAISuggestions: true,
    fields: ["designStyle"],
  },
  {
    id: "features",
    component: (props: StepProps) => (
      <MultiSelectGrid
        {...props}
        field="features"
        title="What core capabilities does your software need?"
        subtitle="Select the essential features required for your business to operate."
        options={Object.keys(pricing.features)}
      />
    ),
    showAISuggestions: true,
    fields: ["features"],
  },
  {
    id: "aiFeatures",
    component: (props: StepProps) => (
      <MultiSelectGrid
        {...props}
        field="aiFeatures"
        title="Would you like to add Smart AI capabilities?"
        subtitle="AI can automate tasks and provide a magical experience for your users."
        options={Object.keys(pricing.aiFeatures)}
      />
    ),
    showAISuggestions: true,
    fields: ["aiFeatures"],
  },
  {
    id: "integrations",
    component: (props: StepProps) => (
      <MultiSelectGrid
        {...props}
        field="integrations"
        title="What existing tools do you need to connect with?"
        subtitle="We can integrate your software with payment gateways, CRMs, and more."
        options={Object.keys(pricing.integrations)}
      />
    ),
    showAISuggestions: true,
    fields: ["integrations"],
  },
  {
    id: "timeline",
    component: (props: StepProps) => (
      <SingleSelectGrid
        {...props}
        field="timeline"
        title="When do you need this project completed?"
        subtitle="This helps us allocate the right size team to meet your deadline."
        options={Object.keys(pricing.timelineModifiers)}
        onNext={props.onNext}
      />
    ),
    showAISuggestions: true,
    fields: ["timeline"],
  },
  {
    id: "budget",
    component: (props: StepProps) => (
      <SingleSelectGrid
        {...props}
        field="budget"
        title="What is your estimated budget?"
        subtitle="This helps us design a solution that maximizes your ROI within your constraints."
        options={["Minimum", "Recommended", "Ideal", "Maximum"]}
        onNext={props.onNext}
      />
    ),
    showAISuggestions: true,
    fields: ["budget"],
  },
  { id: "references", component: ReferencesStep, fields: ["referenceUrls", "attachments"] },
  {
    id: "details",
    component: (props: StepProps) => (
      <TextareaStep
        {...props}
        field="details"
        title="Any other details we should know?"
        subtitle="Provide any additional context, requirements, or links you'd like to share."
        placeholder="Please describe your project..."
      />
    ),
    fields: ["details"],
  },
  {
    id: "additionalNotes",
    component: (props: StepProps) => (
      <TextareaStep
        {...props}
        field="additionalNotes"
        title="Additional Notes"
        placeholder="Any special requirements or future plans..."
      />
    ),
    fields: ["additionalNotes"],
  },
  { id: "engagementModel", component: EngagementModelStep, fields: ["engagementModel"] },
];
