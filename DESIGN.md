# Landing page concurso motorizados

## Mission
Create implementation-ready, token-driven UI guidance for Landing page concurso motorizados that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand
- Product/brand: Landing page concurso motorizados
- URL: https://claude.ai/artifact/3Gjz4ZhQMftraFVwXE7fR8
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=anthropic-sans`, `font.family.stack=anthropic-sans, ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, PingFang TC, Hiragino Sans, Apple SD Gothic Neo, Kohinoor Devanagari, Kohinoor Bangla, Kohinoor Telugu, Tamil Sangam MN, Kohinoor Gujarati, Malayalam Sangam MN, Nirmala UI, Noto Sans Devanagari UI, Noto Sans Devanagari, Noto Sans Bengali UI, Noto Sans Bengali, Noto Sans Telugu UI, Noto Sans Telugu, Noto Sans Tamil UI, Noto Sans Tamil, Noto Sans Gujarati UI, Noto Sans Gujarati, Noto Sans Kannada UI, Noto Sans Kannada, Noto Sans Malayalam UI, Noto Sans Malayalam, Thonburi, Leelawadee UI, Noto Sans Thai UI, Noto Sans Thai, Kefa, Ebrima, Noto Sans Ethiopic, Abyssinica SIL, sans-serif, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, PingFang SC, PingFang TC, Hiragino Sans, Apple SD Gothic Neo, sans-serif`, `font.size.base=13px`, `font.weight.base=400`, `font.lineHeight.base=19px`
- Typography scale: `font.size.xs=13px`
- Color palette: `color.text.primary=#f0efec`, `color.surface.base=#000000`, `color.border.default=color(srgb 1 1 1 / 0.1)`, `color.surface.raised=#1a1a19`, `color.border.strong=rgb(240, 239, 236) rgb(240, 239, 236) rgba(255, 255, 255, 0.05)`
- Spacing scale: `space.1=6px`, `space.2=8px`, `space.3=12px`
- Radius/shadow/motion tokens: `radius.xs=6px` | `shadow.1=rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` | `motion.duration.instant=60ms`, `motion.duration.fast=450ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: buttons (2), links (1), navigation (1).

- Extraction diagnostics: Low sample size: fewer than 30 visible elements were extracted. Limited typography variety detected; size scale may need manual refinement. Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
