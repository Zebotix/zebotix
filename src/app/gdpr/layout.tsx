import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'GDPR / Data Processing Agreement — Zebotix',
  description:
    'GDPR and Data Processing Agreement for Zebotix — compliance, data handling, and user rights.',
};

export default function GDPR({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
