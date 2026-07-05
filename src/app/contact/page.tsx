"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import { submitContactForm, contactSchema, type ContactInput } from "../actions/contact";

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

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const liveRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      subject: "",
    },
  });

  function onSubmit(data: ContactInput) {
    setStatus("idle");
    setMessage("");

    startTransition(async () => {
      const result = await submitContactForm(data);

      if (result.success) {
        setStatus("success");
        setMessage("Thanks — your message was sent. We will reply soon.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong.");
      }
      liveRef.current?.focus();
    });
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center bg-zinc-950 overflow-hidden">
        <Image
          src="/images/contact-hero.webp"
          alt="Contact Us Background"
          fill
          priority
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="relative z-10 text-center max-w-3xl px-4 mt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-zinc-300">
            Have a project in mind or need enterprise support? Our team is ready to help you build
            the future.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-zinc-950 text-zinc-300 py-20 px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Form Column */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <svg
                  className="w-32 h-32 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={0.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
                Send us a message
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">Full Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
                              {...field}
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
                          <FormLabel className="text-zinc-400">Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@company.com"
                              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
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
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">Company Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Acme Corp"
                              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-400"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">How can we help you? *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Tell us about your project, timeline, and goals..."
                            className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-400 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-white text-black font-semibold py-4 px-8 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 rounded-none h-auto"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 text-black" />
                        Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>

                  {/* Status Message (Live Region) */}
                  <div ref={liveRef} aria-live="polite" tabIndex={-1} className="outline-none">
                    {status === "success" && (
                      <div className="mt-4 p-4 bg-green-950/50 border border-green-900 text-green-400 text-sm">
                        {message}
                      </div>
                    )}
                    {status === "error" && (
                      <div className="mt-4 p-4 bg-red-950/50 border border-red-900 text-red-400 text-sm">
                        {message}
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </div>

            {/* Image Column */}
            <div className="relative h-[600px] lg:h-[700px] w-full bg-zinc-900 border border-zinc-800 group">
              <Image
                src="/images/contact-hr.webp"
                alt="HR Representative"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay styling for a premium touch */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 via-zinc-950/20 to-transparent mix-blend-multiply" />

              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
                <p className="text-2xl md:text-3xl font-light text-white leading-tight">
                  "We are here to listen, understand, and deliver excellence."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-zinc-500" />
                  <span className="text-zinc-400 font-medium tracking-wider uppercase text-sm">
                    Client Relations Team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
