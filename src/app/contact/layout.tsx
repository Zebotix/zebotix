import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Zebotix',
  description:
    'Contact Zebotix — Karachi-based digital studio. Reach us by phone, email, social or send a message using the form.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
