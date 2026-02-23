"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import HeroImg from '@/assets/hero.webp';

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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
      }
    });

    // Main image animation
    tl.fromTo(imageRef.current,
      {
        opacity: 0,
        x: -50,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Content animation
    tl.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Stats animation
    const statsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top bottom-=100",
        end: "bottom center",
        onEnter: () => setStartCounting(true),
        once: true
      }
    });

    statsTimeline.fromTo(".stat-card",
      {
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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

            <div ref={statsRef}>
              <Separator className="my-8" />

              {/* Stats/highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Years of Excellence Card */}
                <Card className="stat-card group relative overflow-hidden border-none bg-primary/5 hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-primary">
                          {startCounting ? (
                            <CountUp
                              end={25}
                              duration={2.5}
                              separator=""
                              decimal="."
                              decimals={0}
                              enableScrollSpy
                            />
                          ) : '0'}
                        </span>
                        <span className="text-3xl font-bold text-primary">+</span>
                      </div>
                      <p className="text-sm font-medium tracking-wider uppercase text-primary/80">
                        Years of Excellence
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </CardContent>
                </Card>

                {/* Rice Varieties Card */}
                <Card className="stat-card group relative overflow-hidden border-none bg-brand-gold/5 hover:bg-brand-gold/10 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-brand-gold">
                          {startCounting ? (
                            <CountUp
                              end={7}
                              duration={2}
                              separator=""
                              enableScrollSpy
                            />
                          ) : '0'}
                        </span>
                        <span className="text-3xl font-bold text-brand-gold">+</span>
                      </div>
                      <p className="text-sm font-medium tracking-wider uppercase text-brand-gold/80">
                        Rice<br /> Varieties
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </CardContent>
                </Card>

                {/* Quality Assured Card */}
                <Card className="stat-card group relative overflow-hidden border-none bg-primary/5 hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-primary">
                          {startCounting ? (
                            <CountUp
                              end={100}
                              duration={2.5}
                              separator=""
                              enableScrollSpy
                            />
                          ) : '0'}
                        </span>
                        <span className="text-3xl font-bold text-primary">%</span>
                      </div>
                      <p className="text-sm font-medium tracking-wider uppercase text-primary/80">
                        Quality Assured
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </CardContent>
                </Card>
              </div>
              {/*               
              <Button size="lg" className="w-full sm:w-auto">
                Explore Our Heritage
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}