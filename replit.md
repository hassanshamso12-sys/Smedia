# S.media Hub

A unified social media management and marketing hub with a landing page, analytics dashboard, and admin CMS backed by Firebase Firestore.

## Run & Operate

- `pnpm --filter @workspace/smedia-hub run dev` — run the frontend (Vite dev server)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: Firebase vars (see below)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/smedia-hub)
- Backend/CMS: Firebase Firestore (client-side, via firebase SDK)
- Styling: CSS Modules + custom design tokens (no Tailwind on the main app)

## Where things live

- `artifacts/smedia-hub/src/pages/` — page components (LandingPage, DashboardPage, SupportPage)
- `artifacts/smedia-hub/src/components/Landing/` — landing page sections (Navbar, Hero, Trust, Services, PortfolioGrid)
- `artifacts/smedia-hub/src/components/Dashboard/` — dashboard components (BentoGrid, StatCard, ChartPlaceholder)
- `artifacts/smedia-hub/src/components/Sidebar/` — dashboard sidebar
- `artifacts/smedia-hub/src/components/UI/DynamicTheme.tsx` — applies Firestore theme settings to CSS vars
- `artifacts/smedia-hub/src/lib/firebase/config.ts` — Firebase initialization (reads VITE_FIREBASE_* env vars)
- `artifacts/smedia-hub/src/lib/hooks/useContent.ts` — Firestore listener for live site content
- `artifacts/smedia-hub/src/index.css` — design tokens (CSS custom properties) + global styles
- `artifacts/smedia-hub/src/app/dashboard/page.module.css` — dashboard CSS module
- `artifacts/smedia-hub/src/app/support/support.module.css` — support/admin CSS module

## Architecture decisions

- No backend API server — all data comes from Firebase Firestore via the client SDK
- Content is managed via /support admin panel (login: admin / smedia2026) and saved to Firestore `site_content/config`
- `useContent()` hook uses Firestore `onSnapshot` for real-time updates across all pages
- `DynamicTheme` applies theme CSS vars from Firestore (primary color, background, fonts) at runtime
- CSS Modules for all component-level styles, with global CSS tokens in index.css

## Product

- **Landing page** (/) — Hero, Trust stats, Services, Portfolio grid, CTA/contact section, footer
- **Dashboard** (/dashboard) — bento grid analytics dashboard with stat cards, performance chart, connections panel, content calendar
- **Support/Admin** (/support) — password-protected CMS panel to edit hero text, contact info, services, portfolio items, and theme

## User preferences

- App uses its own CSS design system (not Tailwind) — maintain CSS Module + custom property patterns

## Gotchas

- Firebase env vars use VITE_ prefix (not NEXT_PUBLIC_): VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.
- Without Firebase config, the app works with default placeholder content (graceful fallback)
- The /support admin login credentials are hardcoded: admin / smedia2026

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
