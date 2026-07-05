"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitContactForm, contactSchema, type ContactInput } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
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

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactInput) => {
    startTransition(async () => {
      try {
        const response = await submitContactForm(data);

        if (!response.success) {
          throw new Error(response.message || "Failed to send");
        }

        toast.success("Message sent successfully!");
        onClose();
        form.reset();
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Failed to send message. Please try again later."
        );
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-zinc-900 border-zinc-800 rounded-none p-0 shadow-2xl text-zinc-100 sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col gap-0">
        <div className="p-8 md:p-10 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black text-white mb-2 tracking-tight uppercase">
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Have a project in mind? Let&apos;s build something amazing together.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full bg-zinc-950/70 border border-zinc-850 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:outline-hidden p-3.5 text-white placeholder-zinc-650 transition-all rounded-none font-medium text-sm"
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
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="w-full bg-zinc-950/70 border border-zinc-850 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:outline-hidden p-3.5 text-white placeholder-zinc-650 transition-all rounded-none font-medium text-sm"
                        placeholder="john@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                      Project Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        {...field}
                        className="w-full bg-zinc-950/70 border border-zinc-850 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:outline-hidden p-3.5 text-white placeholder-zinc-650 resize-none transition-all rounded-none font-medium text-sm"
                        placeholder="Tell us about your project..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-4 rounded-none transition-all h-auto text-sm border border-blue-500/20 flex items-center justify-center gap-2"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ContactModal);
