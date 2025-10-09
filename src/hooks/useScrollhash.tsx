'use client';
import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      // remove leading '#'
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        // adjust offset for fixed header (change 80 to your header height)
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };

    // run once on mount
    scrollToHash();

    // also listen for future hash changes (optional)
    window.addEventListener('hashchange', scrollToHash, false);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return null;
}
