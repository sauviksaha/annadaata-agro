"use client";

import React, { useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Process steps data
const processSteps = [
  {
    id: 1,
    title: "Cultivation",
    description: "Our rice journey begins in carefully selected fields where we partner with local farmers who follow our sustainable farming practices.",
    icon: "🌱",
  },
  {
    id: 2,
    title: "Harvesting",
    description: "When the rice reaches perfect maturity, it's harvested using methods that preserve grain quality and minimize waste.",
    icon: "🌾",
  },
  {
    id: 3,
    title: "Drying & Aging",
    description: "Harvested rice undergoes controlled drying to achieve optimal moisture content, followed by aging for select varieties to enhance aroma and flavor.",
    icon: "☀️",
  },
  {
    id: 4,
    title: "Milling & Processing",
    description: "Using state-of-the-art equipment, we process the rice to remove husks and polish grains while preserving nutritional integrity.",
    icon: "⚙️",
  },
  {
    id: 5,
    title: "Quality Control",
    description: "Every batch undergoes rigorous quality checks to ensure it meets our high standards for color, taste, texture, and purity.",
    icon: "🔍",
  },
  {
    id: 6,
    title: "Packaging & Distribution",
    description: "The approved rice is packaged in eco-friendly materials, preserving freshness while being kind to the environment.",
    icon: "📦",
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const qualityIconRef = useRef<HTMLDivElement>(null);
  const qualityTitleRef = useRef<HTMLHeadingElement>(null);
  const qualityTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=100",
        }
      }
    );

    // Timeline line drawing animation
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center+=100",
            end: "bottom center-=100",
            scrub: true,
          }
        }
      );
    }

    // Process steps animation
    const steps = gsap.utils.toArray(".process-step");
    steps.forEach((step: any, index: number) => {
      gsap.fromTo(step,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top bottom-=100",
          }
        }
      );
    });

    // Quality promise section animations
    const qualityTl = gsap.timeline({
      scrollTrigger: {
        trigger: qualityRef.current,
        start: "top bottom-=100",
      }
    });

    qualityTl
      .fromTo(qualityRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(qualityIconRef.current,
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .fromTo(qualityTitleRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(qualityTextRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            From <span className="text-primary">Fields</span> to <span className="text-brand-gold">Tables</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive and carefully monitored process ensures that every grain of rice that reaches your plate is of the finest quality.
          </p>
        </div>

        {/* Process Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line for timeline */}
          <div className="relative hidden md:block h-full">
            {/* Background line */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-primary/10" />
            {/* Animated line */}
            <div
              ref={lineRef}
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-primary origin-top"
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-32 relative">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="process-step relative group"
              >
                <div className={`md:flex items-center md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline point for desktop */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
                    <div className="relative">
                      {/* Outer glow */}
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg transform scale-125" />
                      {/* Main circle */}
                      <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary font-bold text-xl shadow-lg group-hover:scale-110 transition-all duration-300 border-2 border-primary">
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Content container */}
                  <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10 group-hover:border-primary/20">
                      {/* Mobile timeline point */}
                      <div className="flex items-center gap-3 mb-4 md:hidden">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-bold text-sm border-2 border-primary">
                          {step.id}
                        </div>
                        <h3 className="text-xl font-heading font-semibold">{step.title}</h3>
                      </div>

                      {/* Desktop heading */}
                      <h3 className="text-xl font-heading font-semibold mb-4 hidden md:block">{step.title}</h3>

                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon container */}
                  <div className={`hidden md:flex md:w-[45%] ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cream/40 to-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                      <div className="text-primary text-2xl">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator for mobile */}
                {index < processSteps.length - 1 && (
                  <Separator className="my-6 md:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quality Promise */}
        <div
          ref={qualityRef}
          className="relative mt-32 text-center max-w-3xl mx-auto"
        >
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-[32px] blur-3xl -z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5 rounded-[32px] blur-2xl -z-10" />

          {/* Main content card */}
          <div className="relative bg-white/50 backdrop-blur-md p-12 rounded-[32px] shadow-xl border border-primary/10">
            {/* Icon container with animated ring */}
            <div ref={qualityIconRef} className="relative w-24 h-24 mx-auto mb-8">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-full animate-slow-spin" />
              {/* Inner circle with icon */}
              <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-brand-gold/10 rounded-full flex items-center justify-center shadow-lg border border-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 text-primary"
                >
                  <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3s.7 2.4 1.7 3c-.3 1.2 0 2.5 1 3.4.8.8 2.1 1.2 3.3 1 .6 1 1.8 1.6 3 1.6s2.4-.6 3-1.7c1.2.3 2.5 0 3.4-1 .8-.8 1.2-2 1-3.3 1-.6 1.6-1.8 1.6-3s-.6-2.4-1.7-3c.3-1.2 0-2.5-1-3.4a4 4 0 0 0-3.3-1c-.6-1-1.8-1.6-3-1.6Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>

            {/* Title with gradient text */}
            <h3
              ref={qualityTitleRef}
              className="text-3xl font-heading font-bold mb-6 text-primary"
            >
              <span className="text-primary">Our Quality Promise</span>
            </h3>

            {/* Description with enhanced typography */}
            <p
              ref={qualityTextRef}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              At every step of our process, we maintain strict quality control and adherence to sustainable practices.
              This careful attention to detail ensures that the rice delivered to your home is not just food -
              it's a premium culinary experience that honors both tradition and innovation.
            </p>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}