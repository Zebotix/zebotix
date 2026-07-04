import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cookie Policy — Zebotix',
  description: 'Cookie Policy for Zebotix — how we use cookies and similar technologies.',
};

export default function CookiePolicy({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
