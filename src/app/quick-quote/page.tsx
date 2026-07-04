'use client';

import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { submitQuickQuoteAction } from '@/app/actions/quick-quote';
import { Reveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';

export default function QuickQuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    businessType: '',
    colorThemes: [] as string[],
    features: [] as string[],
    budget: '',
    timeline: '',
    details: '',
    referenceUrls: [] as string[],
    attachments: [] as string[],
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [refUrlInput, setRefUrlInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const nextStep = () => setStep((s) => Math.min(s + 1, 8));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSelectOne = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    nextStep();
  };

  const handleMultiSelect = (field: 'colorThemes' | 'features', value: string) => {
    setFormData((prev) => {
      const list = prev[field];
      const newList = list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
      return { ...prev, [field]: newList };
    });
  };

  const handleAddRefUrl = () => {
    if (refUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        referenceUrls: [...prev.referenceUrls, refUrlInput.trim()],
      }));
      setRefUrlInput('');
    }
  };

  const handleRemoveRefUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      referenceUrls: prev.referenceUrls.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await submitQuickQuoteAction(formData);
    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || 'Something went wrong. Please check fields.');
    }
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
                Thank you for submiting your digital specifications. Our software architects will review your project and get back to you with a roadmap within 24 hours.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl relative">
            {/* Header progress info */}
            <div className="flex justify-between items-center mb-8 border-b border-zinc-850 pb-4">
              <span className="text-xs uppercase tracking-widest text-zinc-555 font-bold flex items-center gap-1">
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
            <form onSubmit={handleSubmit}>
              {/* Step 1: Project Type */}
              {step === 1 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-8">What type of project are we building?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Website', 'Web App', 'School ERP', 'AI Automation', 'E-commerce Platform', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelectOne('projectType', type)}
                        className={`text-left p-5 border transition-all duration-200 font-bold ${
                          formData.projectType === type
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Step 2: Business Type */}
              {step === 2 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-8">What is your industry/business type?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['School / Education', 'Hospital / MedTech', 'Restaurant / Food', 'Real Estate', 'Retail / E-commerce', 'Tech Startup', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelectOne('businessType', type)}
                        className={`text-left p-5 border transition-all duration-200 font-bold ${
                          formData.businessType === type
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Step 3: Color Themes */}
              {step === 3 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Select your design/color preferences</h2>
                  <p className="text-zinc-500 text-sm mb-8">Choose all themes that align with your brand persona.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Minimal & Clean', 'Dark Mode Default', 'Luxury & High-end', 'Corporate & Trustworthy', 'Modern & Vibrant', 'Elegant & Classical'].map((theme) => {
                      const isSelected = formData.colorThemes.includes(theme);
                      return (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => handleMultiSelect('colorThemes', theme)}
                          className={`text-left p-5 border transition-all duration-200 font-bold flex justify-between items-center ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500/5 text-white'
                              : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span>{theme}</span>
                          {isSelected && <Check className="h-5 w-5 text-blue-500" />}
                        </button>
                      );
                    })}
                  </div>
                </Reveal>
              )}

              {/* Step 4: Features */}
              {step === 4 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">What features are required?</h2>
                  <p className="text-zinc-500 text-sm mb-8">Select all required digital modules.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['User Authentication', 'Admin Dashboard / CMS', 'Payment Gateway Integration', 'Inventory Management', 'Advanced Reports & Analytics', 'Blog / Resources Section', 'AI Integration / LLM Agents'].map((feat) => {
                      const isSelected = formData.features.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => handleMultiSelect('features', feat)}
                          className={`text-left p-4 border transition-all duration-200 text-sm font-bold flex justify-between items-center ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500/5 text-white'
                              : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400'
                          }`}
                        >
                          <span>{feat}</span>
                          {isSelected && <Check className="h-4 w-4 text-blue-500" />}
                        </button>
                      );
                    })}
                  </div>
                </Reveal>
              )}

              {/* Step 5: Budget */}
              {step === 5 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-8">What is your budget size?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['$500 - $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+ / Enterprise Custom'].map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => handleSelectOne('budget', bud)}
                        className={`text-left p-5 border transition-all duration-200 font-bold ${
                          formData.budget === bud
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Step 6: Timeline */}
              {step === 6 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-8">What is your expected timeline?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Urgent Launch (< 2 weeks)', 'Standard Launch (1 month)', 'Custom Scope (2+ months)', 'Flexible Schedule'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleSelectOne('timeline', time)}
                        className={`text-left p-5 border transition-all duration-200 font-bold ${
                          formData.timeline === time
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Step 7: Details & References */}
              {step === 7 && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Additional Specifications</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Project Details</label>
                      <textarea
                        rows={4}
                        value={formData.details}
                        onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
                        className="w-full bg-zinc-950 border border-zinc-850 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        placeholder="Tell us about complex rules, specific endpoints, integrations..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Reference Website URLs</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={refUrlInput}
                          onChange={(e) => setRefUrlInput(e.target.value)}
                          className="flex-1 bg-zinc-950 border border-zinc-850 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="https://example.com"
                        />
                        <button
                          type="button"
                          onClick={handleAddRefUrl}
                          className="bg-zinc-800 hover:bg-zinc-750 text-white px-6 font-bold text-sm"
                        >
                          Add URL
                        </button>
                      </div>
                      {formData.referenceUrls.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {formData.referenceUrls.map((url, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-zinc-950 p-2.5 border border-zinc-850 text-xs">
                              <span className="text-zinc-400 truncate max-w-md">{url}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveRefUrl(idx)}
                                className="text-red-500 font-bold hover:underline"
                              >
                                Remove
                              </button>
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
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Who are we contacting?</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-850 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-850 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-850 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Company / Organization</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-850 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Back / Next navigation bar */}
              <div className="mt-12 pt-8 border-t border-zinc-850 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-zinc-450 hover:text-white transition-colors font-bold text-sm uppercase tracking-wider"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
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
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 flex items-center gap-2 disabled:opacity-50"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitting || !formData.name || !formData.email}
                    className="bg-blue-550 hover:bg-blue-650 text-white font-bold h-12 px-8 flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Specifications'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
