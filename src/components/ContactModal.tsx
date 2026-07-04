"use client";

import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    modalRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleInputchange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      toast.success("Message sent successfully!");
      onClose();
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }

      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-100 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="fixed inset-0 z-101 flex items-center justify-center p-4 overflow-y-auto"
        onKeyDown={handleKeyDown}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-none p-8 md:p-10 shadow-2xl text-zinc-100 focus:outline-hidden",
            "max-h-[90vh] overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-200"
          )}
        >
          <button
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 p-2 rounded-none focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>

          <h2 id="contact-modal-title" className="text-2xl font-black text-white mb-2 tracking-tight uppercase">
            Get in Touch
          </h2>
          <p className="text-xs text-zinc-400 mb-8 uppercase tracking-wider font-semibold">
            Have a project in mind? Let&apos;s build something amazing together.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputchange}
                required
                className="w-full bg-zinc-950/70 border border-zinc-850 focus:border-blue-500 focus:ring-0 focus:outline-hidden p-3.5 text-white placeholder-zinc-650 transition-all rounded-none font-medium text-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputchange}
                required
                className="w-full bg-zinc-950/70 border border-zinc-850 focus:border-blue-500 focus:ring-0 focus:outline-hidden p-3.5 text-white placeholder-zinc-650 transition-all rounded-none font-medium text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputchange}
                required
                className="w-full bg-zinc-950/70 border border-zinc-850 focus:border-blue-500 focus:ring-0 focus:outline-hidden p-3.5 text-white placeholder-zinc-650 resize-none transition-all rounded-none font-medium text-sm"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-4 rounded-none transition-all h-auto text-sm border border-blue-500/20"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
};

export default React.memo(ContactModal);
