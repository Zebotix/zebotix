'use client';

import React, { useCallback, useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui';
import ContactModal from './ContactModal';

export default function ContactButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <Button
        onClick={openModal}
        className='z-50 fixed bottom-8 right-8 bg-zebotix-blue hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl focus:outline-hidden focus:ring-4 focus:ring-zebotix-blue/40 transition-all duration-300 hover:scale-110 active:scale-95'
        aria-label='Contact us'
      >
        <Mail className='w-6 h-6' aria-hidden='true' />
      </Button>

      <ContactModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
