"use client";

import React, { useEffect, useRef } from 'react';
import {
  Sprout, Wheat, Sun, Settings2, ShieldCheck, Package2,
  Award, FlaskConical, Leaf, ArrowDownRight, MoveRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Paddy Procurement',
    description:
      'We partner with trusted farmers across West Bengal, sourcing premium paddy varieties grown under transparent, sustainable farming practices.',
    Icon: Sprout,
    accent: 'green' as const,
  },
  {
    step: '02',
    title: 'Harvesting & Intake',
    description:
      'Paddy is harvested at peak maturity using precision techniques that protect grain integrity and minimise field-to-mill losses.',
    Icon: Wheat,
    accent: 'gold' as const,
  },
  {
    step: '03',
    title: 'Drying & Conditioning',
    description:
      'Controlled drying achieves the optimal moisture level. Select varieties are then aged to deepen their natural aroma and flavour profile.',
    Icon: Sun,
    accent: 'green' as const,
  },
  {
    step: '04',
    title: 'Milling & Polishing',
    description:
      'State-of-the-art machinery removes husks and bran with surgical precision, preserving nutritional value and delivering a natural lustre.',
    Icon: Settings2,
    accent: 'gold' as const,
  },
  {
    step: '05',
    title: 'Quality Assurance',
    description:
      'Every batch is lab-tested for colour, texture, aroma, and purity. Only grain that meets our ISO 22000:2018 standards is approved for release.',
    Icon: ShieldCheck,
    accent: 'green' as const,
  },
  {
    step: '06',
    title: 'Packaging & Dispatch',
    description:
      'Approved rice is sealed in eco-conscious packaging engineered to lock in freshness, then dispatched through our precision logistics network.',
    Icon: Package2,
    accent: 'gold' as const,
  },
] as const;

const QUALITY_PILLARS = [
  {
    Icon: Award,
    label: 'ISO 22000:2018',
    sub: 'Food Safety Management Certified',
  },
  {
    Icon: FlaskConical,
    label: 'Lab Verified',
    sub: 'Every batch tested before dispatch',
  },
  {
    Icon: Leaf,
    label: 'Eco-Conscious',
    sub: 'Sustainable from farm to packaging',
  },
] as const;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Header: fade up ───────────────────────────────────────────────────────
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top bottom-=80' },
      }
    );

    // ── Cards: two-row stagger — first row fires slightly earlier ─────────────
    // Row 1 (index 0-2)
    gsap.fromTo(
      '.process-card:nth-child(-n+3)',
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top bottom-=60' },
      }
    );

    // Row 2 (index 3-5) — fires slightly later for a cascading row feel
    gsap.fromTo(
      '.process-card:nth-child(n+4)',
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.09,
        delay: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top bottom-=60' },
      }
    );

    // ── Quality banner: fade up with slight scale ─────────────────────────────
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 36, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: bannerRef.current, start: 'top bottom-=80' },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-20 md:py-32 bg-stone-50 relative overflow-hidden"
    >
      {/* Subtle ambient radial blobs */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(46,125,50,0.05) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(212,175,55,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Section Header ─────────────────────────────────────── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/[0.08] border border-brand-green/20 text-brand-green text-[11px] font-accent font-bold tracking-[0.15em] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
            Our Process
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-5">
            From <span className="text-primary">Fields</span> to{' '}
            <span className="text-brand-gold">Tables</span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Six rigorously monitored stages — from seed selection to your doorstep — ensuring
            every grain carries our uncompromising standard of quality.
          </p>
        </div>

        {/* ── Process Grid ───────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {PROCESS_STEPS.map((step, index) => {
            const isLastInRow = (index + 1) % 3 === 0;
            const isLastItem = index === PROCESS_STEPS.length - 1;
            const isSecondRow = index >= 3;

            return (
              <div
                key={step.step}
                className="process-card group relative bg-white rounded-2xl border border-stone-100 p-7 md:p-8 overflow-hidden hover:border-brand-green/30 hover:shadow-[0_8px_32px_rgba(46,125,50,0.10)] transition-all duration-300"
              >
                {/* Watermark step number */}
                <span
                  aria-hidden
                  className="absolute -bottom-3 -right-1 text-[96px] font-heading font-black leading-none text-stone-100 select-none pointer-events-none group-hover:text-brand-green/[0.07] transition-colors duration-500"
                >
                  {step.step}
                </span>

                {/* Top accent bar */}
                <div
                  className={cn(
                    'absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300 opacity-0 group-hover:opacity-100',
                    step.accent === 'green' ? 'bg-brand-green' : 'bg-brand-gold'
                  )}
                />

                {/* Icon + step label row */}
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div
                    className={cn(
                      'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md',
                      step.accent === 'green'
                        ? 'bg-brand-green/[0.08] text-brand-green group-hover:bg-brand-green group-hover:text-white'
                        : 'bg-brand-gold/[0.10] text-brand-gold group-hover:bg-brand-gold group-hover:text-white'
                    )}
                  >
                    <step.Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>

                  <div
                    className={cn(
                      'flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border shadow-sm',
                      step.accent === 'green'
                        ? 'bg-white border-brand-green/25'
                        : 'bg-white border-amber-200/70'
                    )}
                  >
                    <span
                      className={cn(
                        'flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black text-white leading-none shrink-0',
                        step.accent === 'green' ? 'bg-brand-green' : 'bg-brand-gold'
                      )}
                    >
                      {parseInt(step.step)}
                    </span>
                    <span
                      className={cn(
                        'text-[11px] font-accent font-semibold tracking-wide',
                        step.accent === 'green' ? 'text-green-800' : 'text-amber-800'
                      )}
                    >
                      Step {step.step}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-[17px] text-foreground mb-2.5 group-hover:text-brand-green transition-colors duration-300 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Row-end arrow connector (desktop, non-last-in-row) */}
                {!isLastInRow && !isLastItem && (
                  <MoveRight
                    aria-hidden
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-stone-300 hidden lg:block z-20"
                  />
                )}

                {/* Row-break downward connector (desktop, last in first row) */}
                {isLastInRow && !isSecondRow && (
                  <ArrowDownRight
                    aria-hidden
                    className="absolute -bottom-[9px] right-4 w-4 h-4 text-stone-300 hidden lg:block z-20"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Quality Promise Banner ──────────────────────────────── */}
        <div
          ref={bannerRef}
          className="mt-12 md:mt-16 rounded-2xl bg-brand-green-dark overflow-hidden relative"
        >
          {/* Decorative glows */}
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-gold/[0.12] blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/[0.05] blur-3xl" />
          </div>

          {/* Subtle dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 px-7 py-9 md:px-12 md:py-11">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-center">

              {/* Left: label + heading */}
              <div>
                <p className="text-brand-gold/70 font-accent text-[11px] tracking-[0.18em] uppercase font-semibold mb-3">
                  Our Commitment
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                  Quality at Every Stage
                </h3>
                <p className="text-white/50 text-sm mt-3 leading-relaxed max-w-xs">
                  Rigorous standards applied from the very first grain to the final sealed pack.
                </p>
              </div>

              {/* Right: pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {QUALITY_PILLARS.map(({ Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3.5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.10] text-brand-gold shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-semibold font-accent text-sm leading-tight">
                        {label}
                      </p>
                      <p className="text-white/45 text-xs mt-1 leading-snug">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
