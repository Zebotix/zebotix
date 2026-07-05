"use client";

import { Mail } from "lucide-react";
import React, { useCallback, useState } from "react";

import ContactModal from "./ContactModal";

import { Button } from "@/components/ui";

export default function ContactButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Button
        type="button"
        onClick={openModal}
        className="group z-50 fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center border border-white/10"
        aria-label="Contact us"
      >
        <Mail className="w-6 h-6 md:w-7 md:h-7 pointer-events-none" aria-hidden="true" />
      </Button>

      <ContactModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
