<!--
Sync Impact Report
==================
Version change: N/A (template) → 1.0.0
Initial constitution filled from template — all placeholder tokens replaced.

Modified principles: All 5 principles defined from scratch.
Added sections:
  - Design & User Experience Standards
  - Scope & Versioning Constraints
Removed sections: None (template sections repurposed).

Templates requiring updates:
  - .specify/templates/plan-template.md — ✅ Compatible (Constitution Check section is generic)
  - .specify/templates/spec-template.md — ✅ Compatible (user scenarios, requirements, success criteria align)
  - .specify/templates/tasks-template.md — ✅ Compatible (testing phases and user story structure align)
  - .specify/templates/commands/ — N/A (no command files exist)

Follow-up TODOs: None. All placeholders resolved.
-->

# Shift Digital Website Platform Constitution

## Core Principles

### I. Code Quality & Maintainability
All code MUST be clean, readable, and modular. Components MUST be reusable across
sections and follow a single responsibility pattern. Naming conventions MUST be clear
and consistent — file names, variable names, component names, and CSS classes MUST
reflect their purpose without abbreviation or ambiguity.

- Every component MUST have a single, well-defined responsibility.
- Shared UI primitives (buttons, form fields, cards, section wrappers) MUST be
  extracted as reusable components.
- No magic numbers, hardcoded secrets, or undocumented assumptions in source code.
- TypeScript strict mode MUST be enabled; `any` types require explicit justification
  in code review.
- Dependencies MUST be audited — no unnecessary libraries added without measurable
  benefit.

**Rationale**: A maintainable codebase reduces onboarding time, prevents regressions,
and allows Shift Digital to iterate the website quickly as the business grows.

### II. Mobile-First Responsive Design
Every page and section MUST deliver a usable experience on desktop (≥1024px), tablet
(768px–1023px), and mobile (<768px). The mobile-first approach MUST be applied: base
styles target mobile, with progressive enhancement for larger viewports.

- No horizontal scrolling MUST occur at any supported breakpoint.
- Touch targets MUST be at least 44×44px on mobile.
- Navigation MUST collapse to a mobile menu below the tablet breakpoint.
- All CTAs MUST remain visible and tappable on every screen size.
- Layout MUST reflow correctly on device rotation.

**Rationale**: Shift Digital's target audience — business owners, clinic operators,
and startup founders — frequently browse on mobile devices. A broken mobile
experience directly loses leads.

### III. Performance & Optimization
The website MUST load its Largest Contentful Paint (LCP) in under 2.5 seconds and
achieve a Lighthouse performance score of at least 85 on mobile and 90 on desktop.

- All images MUST be compressed, served in modern formats (WebP/AVIF), and use
  responsive `srcset` with appropriate dimensions.
- Images and below-the-fold content MUST use lazy loading.
- CSS and JavaScript bundles MUST be minimal; unused code paths MUST be eliminated
  (tree-shaking).
- Third-party scripts MUST be loaded asynchronously or deferred; the website MUST
  remain fully functional if analytics or external scripts fail.
- Cumulative Layout Shift (CLS) MUST remain below 0.1.

**Rationale**: Page speed directly impacts bounce rate, SEO ranking, and user trust.
A slow website undermines Shift Digital's positioning as a premium digital
transformation company.

### IV. Testing & Quality Assurance
All core user flows MUST be covered by automated tests before launch. Tests MUST
exist for the critical paths that affect lead generation and user trust.

- Homepage navigation and section rendering MUST be tested.
- Services section rendering and CTA routing MUST be tested.
- Portfolio card rendering, expansion, and empty-state fallback MUST be tested.
- Contact form validation, submission, loading state, success feedback, and error
  handling MUST be tested.
- WhatsApp click-to-chat link and fallback behavior MUST be tested.
- FAQ accordion expand/collapse and keyboard accessibility MUST be tested.
- Responsive behavior across desktop, tablet, and mobile breakpoints MUST be tested.
- Tests MUST be written BEFORE implementation for new features (test-first
  discipline). Tests MUST fail initially, then pass after implementation.

**Rationale**: The contact form and WhatsApp link are the primary lead generation
channels. Failures in these flows mean lost business. Automated testing is the only
reliable way to prevent regressions as the site evolves.

### V. Security & Data Protection
All user-submitted data MUST be handled securely. The website MUST protect both
visitors and Shift Digital from common web threats.

- All form inputs MUST be validated on both client and server; server validation is
  authoritative.
- The lead submission endpoint MUST enforce IP-based rate limiting (maximum 5
  submissions per IP per 15-minute window).
- Spam protection (e.g., reCAPTCHA, Turnstile, or honeypot) MUST be active on the
  contact form.
- No secrets, API keys, or environment-specific credentials MUST be exposed in
  client-side code or committed to the repository.
- HTTPS MUST be enforced in production; HTTP requests MUST be redirected.
- Lead data MUST be sanitized before storage or email delivery to prevent injection
  attacks.
- Dependencies MUST be scanned for known vulnerabilities before launch and regularly
  afterward.
- Contact form MUST provide a safe fallback to WhatsApp when backend submission
  fails, preserving the user's ability to reach Shift Digital.

**Rationale**: A security incident involving customer data or a compromised form
would irreparably damage trust in Shift Digital. Security is non-negotiable for a
business that sells digital transformation expertise.

## Design & User Experience Standards

### Consistent Branding & Visual System
The website MUST present a unified, premium visual identity that communicates trust
and professionalism.

- Typography: A single type scale MUST be used across all sections; headings MUST
  follow a consistent hierarchy (h1 → h2 → h3).
- Colors: A defined color palette MUST be applied; contrast ratios MUST meet WCAG AA
  minimums (4.5:1 for normal text, 3:1 for large text).
- Spacing: A consistent spacing scale (4px or 8px base grid) MUST govern padding,
  margins, and gaps between sections and elements.
- Buttons: Primary and secondary button variants MUST be consistent in size, color,
  hover state, focus ring, and active state across the entire site.
- Forms: All form fields MUST share the same visual language — label position, input
  height, border radius, error state styling, and focus indicators.
- Section layouts: Content width MUST be constrained to a consistent max-width
  container; sections MUST have consistent vertical rhythm.

### Business-Focused User Experience
Every section MUST serve a clear business purpose and guide the visitor toward
understanding Shift Digital's value.

- The homepage hero MUST communicate who Shift Digital is, what it offers, and why
  digital transformation matters — within the first viewport.
- Services MUST be described in business-outcome language, not technical jargon.
- Digital transformation MUST be explained with concrete before/after examples
  showing speed, quality, and customer experience improvements.
- Every section MUST include a visible next action (CTA) so the user never reaches a
  dead end.
- Content MUST be understandable by non-technical business owners, clinic operators,
  and startup founders.

### Contact & Lead Form UX
The contact form is the primary conversion mechanism and MUST follow strict UX rules.

- Validation MUST be instant and inline — errors MUST appear adjacent to the
  relevant field, not in a generic banner.
- The submit button MUST show a loading state (spinner or disabled state) during
  submission to prevent double-clicks.
- Successful submission MUST display a clear confirmation message.
- Failed submission MUST preserve all user input, display a retry option, AND offer
  WhatsApp as a fallback communication channel.
- Required fields MUST be clearly marked; optional fields MUST be labeled as such.
- The form MUST prevent duplicate rapid submissions (debounce or disable after first
  click).

### Accessibility (WCAG 2.1 AA)
The website MUST be usable by people with disabilities, targeting WCAG 2.1 Level AA
conformance.

- All interactive elements MUST be keyboard accessible (Tab, Enter, Escape).
- Focus order MUST follow a logical DOM sequence; focus indicators MUST be visible.
- All images MUST have descriptive `alt` text; decorative images MUST use empty
  `alt=""`.
- Color MUST not be the sole means of conveying information (e.g., error states must
  include icon + text, not just red border).
- Form errors MUST be programmatically associated with their fields using
  `aria-describedby`.
- FAQ accordion MUST support keyboard expand/collapse (Enter/Space) and proper ARIA
  states.
- Semantic HTML MUST be used: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`,
  and proper heading hierarchy without skipped levels.
- The website MUST be navigable and readable at 200% browser zoom without content
  loss or horizontal scrolling.

### SEO Fundamentals
The website MUST be discoverable by search engines and sharable on social platforms.

- Every page MUST have a unique, descriptive `<title>` and `<meta name="description">`.
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) MUST be
  present on the homepage.
- Semantic HTML heading hierarchy (h1 → h2 → h3) MUST be followed without skipped
  levels.
- A sitemap.xml MUST be generated and submittable to search engines.
- URLs MUST be clean and descriptive (no query parameters for content pages, no
  `.html` extensions).
- Canonical URL tag MUST be present on every page.

## Scope & Versioning Constraints

### Version 1 Scope Boundaries
The initial launch (v1) is a promotional website with lead generation. Features
beyond this scope MUST NOT be included in v1.

**In Scope (v1)**:
- Homepage hero, services, digital transformation explanation, project portfolio,
  contact/lead form, WhatsApp click-to-chat, testimonials, process section, FAQ,
  responsive design, SEO metadata, basic analytics.

**Out of Scope (v1)**:
- Client login dashboard and client portal.
- Payment processing and billing system.
- Full CRM or lead management system.
- Blog content management system (CMS).
- Native mobile application.
- Marketplace integrations.
- Multi-language content management.
- Advanced AI chatbot.
- Marketing automation.

### Simplicity Principle
v1 MUST favor simplicity over extensibility for unvalidated future needs. Every
feature included MUST map to a specific user need identified in the PRD.

- No abstraction layers for hypothetical future requirements (YAGNI).
- Static content (services, portfolio, testimonials, process steps) may be hardcoded
  in v1 rather than requiring a dynamic CMS or database.
- The lead form backend is the only mandatory dynamic component; portfolio, services,
  and testimonials may be static until v2.
- If a simpler solution delivers equivalent business value, the simpler solution MUST
  be chosen.

**Rationale**: Shipping a focused, high-quality v1 on time builds more trust than a
delayed, overly complex release. Features deferred to v2 remain catalogued in the
MoSCoW prioritization in the PRD.

## Governance

This constitution defines the non-negotiable standards for the Shift Digital Website
Platform. All design, development, and review decisions MUST comply with these
principles.

**Amendment Procedure**:
1. Proposed amendments MUST be documented with rationale and impact analysis.
2. Amendments MUST be reviewed and approved by Dr. Ahmed Awni (Product Owner).
3. Constitution version MUST be incremented per semantic versioning rules:
   - MAJOR: Backward-incompatible principle removal or redefinition.
   - MINOR: New principle or section added, or materially expanded guidance.
   - PATCH: Clarifications, wording fixes, or non-semantic refinements.
4. After amendment, dependent templates (plan, spec, tasks) MUST be checked for
   consistency and updated if needed.

**Compliance Review**:
- Every implementation plan MUST include a Constitution Check section verifying
  alignment with all Core Principles before Phase 0 research begins.
- Pull requests MUST reference which principle(s) they support.
- Violations of Core Principles MUST be explicitly justified in the plan's
  Complexity Tracking table with an explanation of why a simpler compliant
  alternative was rejected.

**Runtime Guidance**: For technology-specific conventions, tooling commands, and
environment setup, refer to the current implementation plan (`.specify/plan.md`) and
`AGENTS.md`.

**Version**: 1.0.0 | **Ratified**: 2026-06-09 | **Last Amended**: 2026-06-09
