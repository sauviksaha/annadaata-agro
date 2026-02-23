/**
 * Shared GSAP animation presets used across every section.
 * All animations use `fromTo` — never `from` — to ensure elements
 * are never left in a broken state if a ScrollTrigger fires late.
 */

// ── Easing ────────────────────────────────────────────────────────────────────
export const EASE = {
  /** Standard exit-ease: fast start, smooth deceleration */
  smooth: 'power3.out',
  /** Slight overshoot — used for cards and badge pop-ins */
  spring: 'back.out(1.5)',
  /** Symmetric — used for image/clip reveals */
  inOut: 'power3.inOut',
} as const;

// ── Duration (seconds) ────────────────────────────────────────────────────────
export const DUR = {
  fast: 0.55,
  base: 0.70,
  slow: 0.90,
} as const;

// ── "From" states ─────────────────────────────────────────────────────────────
export const FROM = {
  /** Generic below-fold entrance */
  fadeUp:    { opacity: 0, y: 32 } as gsap.TweenVars,
  /** Slide in from the left */
  fadeLeft:  { opacity: 0, x: -40 } as gsap.TweenVars,
  /** Slide in from the right */
  fadeRight: { opacity: 0, x: 40 } as gsap.TweenVars,
  /** Pop-in for cards / badges */
  popUp:     { opacity: 0, y: 24, scale: 0.94 } as gsap.TweenVars,
  /** Image reveal: slight zoom + clip */
  imgReveal: {
    opacity: 0,
    scale: 1.05,
    clipPath: 'inset(6% 6% 6% 6% round 12px)',
  } as gsap.TweenVars,
} as const;

// ── "To" state ────────────────────────────────────────────────────────────────
export const TO: gsap.TweenVars = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  clipPath: 'inset(0% 0% 0% 0% round 12px)',
};

// ── ScrollTrigger start helpers ───────────────────────────────────────────────
/**
 * Returns a ScrollTrigger `start` string that fires when the trigger
 * element is `offset`px above the bottom of the viewport.
 */
export function triggerAt(offset = 80): string {
  return `top bottom-=${offset}`;
}
