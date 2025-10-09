import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zebotix',
  description: 'Privacy Policy for Zebotix — data collection, usage, cookies, and user rights.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
