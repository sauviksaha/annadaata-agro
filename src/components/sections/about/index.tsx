"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import HeroImg from '@/assets/hero.webp';

const STATS = [
  {
    value: 25,
    suffix: '+',
    label: 'Years of\nExcellence',
    accent: 'bg-brand-green',
    color: 'text-brand-green',
  },
  {
    value: 7,
    suffix: '+',
    label: 'Rice\nVarieties',
    accent: 'bg-brand-gold',
    color: 'text-brand-gold',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Quality\nAssured',
    accent: 'bg-brand-green',
    color: 'text-brand-green',
  },
] as const;

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const sharedTrigger = {
      trigger: sectionRef.current,
      start: 'top bottom-=80',
    };

    // ── Image column: zoom-out reveal with left slide ─────────────────────────
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -40, scale: 1.03 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: sharedTrigger,
      }
    );

    // ── Content column: stagger each text block ───────────────────────────────
    // Target the direct semantic children — label, heading, paragraphs
    const textNodes = contentRef.current
      ? Array.from(
          contentRef.current.querySelectorAll<HTMLElement>(
            ':scope > div > h4, :scope > div > h2, :scope > div > div > p'
          )
        )
      : [];

    if (textNodes.length) {
      gsap.fromTo(
        textNodes,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top bottom-=60' },
        }
      );
    }

    // ── Stat cards: spring pop-in ─────────────────────────────────────────────
    gsap.fromTo(
      '.stat-card',
      { opacity: 0, y: 28, scale: 0.93 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top bottom-=60',
          onEnter: () => setStartCounting(true),
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 bg-gradient-to-b from-brand-cream/20 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4 relative z-10">
              <div className="aspect-[4/3] relative bg-muted rounded-xl overflow-hidden">
                <Image
                  src={HeroImg}
                  alt="Annadaata Rice Manufacturing Facility"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-xl bg-brand-green/10 -z-10" />

          </div>

          {/* Content Side */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h4 className="text-primary font-accent tracking-wider mb-2">
                OUR LEGACY
              </h4>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
                Crafting Premium Rice Since <span className="text-brand-gold">1998</span>
              </h2>

              <div className="text-muted-foreground space-y-4">
                <p>
                  At Annadaata Agro Industries, we've dedicated over two decades to perfecting the art of rice manufacturing. Our journey began in the fertile lands of West Bengal, where traditional farming wisdom meets modern processing excellence.
                </p>
                <p>
                  Our state-of-the-art manufacturing facility in Bardhaman processes premium rice varieties with precision and care. We maintain stringent quality controls at every step, from grain selection to final packaging, ensuring each batch meets our exacting standards.
                </p>
                <p>
                  Today, we're proud to be one of West Bengal's leading rice manufacturers, known for our flagship Jeerakhasala rice and other premium varieties. Our commitment to quality, sustainability, and customer satisfaction drives everything we do.
                </p>
              </div>
            </div>

            {/* Stats strip */}
            <div ref={statsRef}>
              <div className="h-px bg-border mb-8" />

              <div className="grid grid-cols-3">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`stat-card group py-2 ${
                      i > 0 ? 'pl-6 border-l border-border' : 'pr-6'
                    } ${i === 1 ? 'pr-6' : ''}`}
                  >
                    {/* Coloured accent rule */}
                    <div className={`h-[3px] w-8 rounded-full mb-4 ${stat.accent} transition-all duration-300 group-hover:w-12`} />

                    {/* Number */}
                    <div className="flex items-baseline gap-0.5 leading-none mb-2">
                      <span className={`text-5xl md:text-6xl font-heading font-black tabular-nums ${stat.color}`}>
                        {startCounting ? (
                          <CountUp end={stat.value} duration={2.2} separator="" />
                        ) : (
                          '0'
                        )}
                      </span>
                      <span className={`text-2xl md:text-3xl font-heading font-bold ${stat.color}`}>
                        {stat.suffix}
                      </span>
                    </div>

                    {/* Label */}
                    <p className="text-[11px] font-accent font-semibold tracking-[0.14em] uppercase text-muted-foreground leading-snug whitespace-pre-line">
                      {stat.label}
                    </p>
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