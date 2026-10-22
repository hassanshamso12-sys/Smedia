import { useContent } from '@/lib/hooks/useContent';
import { useEffect } from 'react';

const BRAND_PALETTE = {
  white: '#fafbfd',
  grey: '#a5aab0',
  blueLight: '#1f4e9c',
  blueMid: '#21519d',
  blueDeep: '#114888',
  navy: '#183c76',
  night: '#043164',
  black: '#000000',
};

const LEGACY_COLORS = ['#ff4d4d', '#f9cb28', '#00e5ff', '#004de5', '#ffffff'];

export default function DynamicTheme() {
  const { content } = useContent();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', BRAND_PALETTE.blueLight);
    root.style.setProperty('--accent-secondary', BRAND_PALETTE.blueMid);
    root.style.setProperty('--accent-tertiary', BRAND_PALETTE.blueDeep);
    root.style.setProperty('--accent-quaternary', BRAND_PALETTE.navy);
    root.style.setProperty('--bg-deep', BRAND_PALETTE.black);
    root.style.setProperty('--text-primary', BRAND_PALETTE.white);
    root.style.setProperty('--text-secondary', BRAND_PALETTE.grey);

    if (content?.theme) {
      const pColor = content.theme.primaryColor?.toLowerCase();
      if (pColor && !LEGACY_COLORS.includes(pColor)) {
        root.style.setProperty('--accent-primary', content.theme.primaryColor);
      }
      const bColor = content.theme.backgroundColor?.toLowerCase();
      if (bColor && !LEGACY_COLORS.includes(bColor)) {
        root.style.setProperty('--bg-deep', content.theme.backgroundColor);
      }
      if (content.theme.fontHeading) {
        root.style.setProperty('--font-heading', `'${content.theme.fontHeading}', Inter, system-ui, sans-serif`);
      }
    }
  }, [content]);

  return null;
}
