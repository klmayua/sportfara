# SPORTFARA™ — Claude Code Project Instructions
# This file is read automatically by Claude Code on every run.
# Do not delete or rename this file.

## SKILL: USE ui-ux-pro-max

Before doing anything else in this project, load and apply the
globally installed skill: **ui-ux-pro-max**

This skill governs ALL UI/UX decisions in this project.
Every component, layout, interaction pattern, animation,
and design token decision must go through this skill first.
If the skill provides a method, pattern, or opinion —
follow it. Do not override it with defaults or assumptions.

## PROJECT IDENTITY

- Name: SPORTFARA™
- Tagline: Where Sports Begin
- Brand origin: FARA from Hausa "farawa" — beginning / origin
- Design character: Bloomberg Terminal density + The Athletic
  premium dark feel + glassmorphism with purpose + trust signals
  everywhere

## DESIGN SYSTEM (source of truth)

Apply the ui-ux-pro-max skill using these SPORTFARA-specific tokens:

### Colours
- Primary background: #262938
- Surface (cards, modals): #1A1C26
- Elevated (hover states): #2D3045
- Light mode background: #F5F6F8
- Premium Orange (CTA, live, odds): #F97316
- Premium Orange hover: #EA580C
- Trust Green (verified, success): #10B981
- Trust Green hover: #047857
- Text primary (dark mode): #FFFFFF
- Text secondary: #9CA3AF
- Text tertiary: #6B7280
- Border subtle: #374151
- Border medium: #4B5563
- Info: #3B82F6
- Warning: #F59E0B
- Error: #EF4444

### Typography
- Font sans: Inter, system-ui, -apple-system, sans-serif
- Font mono: JetBrains Mono, SF Mono, monospace
- Score/stat numbers: font-mono font-extrabold
- Source badges: font-mono text-xs uppercase tracking-wider

### Glassmorphism
- Glass card: bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
- Glass nav: bg-primary-dark/80 backdrop-blur-xl border-b border-white/10
- Glass orange: bg-premium-orange/10 backdrop-blur-sm border border-premium-orange/20
- Glass green: bg-trust-green/10 backdrop-blur-sm border border-trust-green/20

### Signature element
The source confidence badge (T1/T2/T3/T4) on every factual claim.
This is the single most distinctive visual element in SPORTFARA.
T1 = trust-green. T2 = info blue. T3 = warning amber. T4 = premium-orange.
font-mono, pill shape, always visible, never hidden.

## BUILD SPECIFICATION

Read and execute: ./SPORTFARA_UIUX_BUILD.yaml

Execute all phases in sequence. Do not skip phases.
Do not add features not specified. Do not remove features that are specified.
When a component is marked MVP — build it fully.
When a component is marked STUB — create the file with a
typed placeholder that renders the ComingSoon component.

## OUTPUT

All files go into: ./sportfara-ui/

When complete, output:
1. A summary table of every file created with its status (MVP / STUB / CONFIG)
2. The exact command to start the dev server
3. Any decisions made where the spec was ambiguous — log them clearly

## CONSTRAINTS

- PWA first. No native app.
- English and French simultaneously. They are equals.
- Dark mode is the default. Light mode is a toggle.
- Mobile-first. Every component works at 375px before 1280px.
- No lorem ipsum. Use real SPORTFARA seed content throughout.
- No placeholder colours. Every colour from the token system above.
- TypeScript strict mode. No `any` types.
