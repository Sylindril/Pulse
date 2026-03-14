# Pulse — Symptom Capture App

## Code Style
- Write simple, maintainable, functional code
- Prefer fewer files over many small ones
- No over-engineering or unnecessary abstractions
- Keep components flat — avoid deep nesting
- Prioritize readability over cleverness
- Use Tailwind CSS for all styling (no CSS modules)
- Use Framer Motion via `motion/react` for animations
- TypeScript with minimal type gymnastics

## Stack
- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui components
- Framer Motion (motion/react)
- Supabase (Postgres, auth, real-time)
- Web Speech API for voice capture
- Lucide React for icons
- React Router for routing

## Conventions
- Supabase client in `src/lib/supabase.ts`
- Custom hooks in `src/hooks/`
- Pages in `src/pages/`
- Shared components in `src/components/`
- Demo/mock data in `src/data/`
