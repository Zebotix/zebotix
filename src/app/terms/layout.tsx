import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Zebotix',
  description:
    'Terms & Conditions for Zebotix — services, payment, IP, warranties, and dispute resolution.',
};
export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
