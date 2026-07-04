import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About — Zebotix',
  description: 'About Zebotix — mission, services, team, compliance and contact information.',
};

export default function About({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
