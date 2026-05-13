'use client';
import { useContent } from '@/lib/hooks/useContent';
import { useEffect } from 'react';

export default function DynamicTheme() {
  const { content } = useContent();

  useEffect(() => {
    if (content?.theme) {
      const root = document.documentElement;
      root.style.setProperty('--accent-primary', content.theme.primaryColor);
      root.style.setProperty('--bg-deep', content.theme.backgroundColor);
      root.style.setProperty('--font-heading', `'${content.theme.fontHeading}', var(--font-geist-sans), Inter, system-ui, sans-serif`);
    }
  }, [content]);

  return null; // This component doesn't render anything, just applies styles
}
