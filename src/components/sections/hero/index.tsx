"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactDialog } from '@/components/dialogs/contact-dialog';
import HeroImg from '@/assets/hero.webp';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const taglineRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Main timeline for hero animations
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 1
      }
    });

    // Hero section animations
    tl.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 }
    )
      .fromTo(subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      )
      .fromTo(descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.3"
      )
      .fromTo(taglineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.2"
      )
      .fromTo(imageRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          scale: 1.1
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.5
        },
        "-=1"
      );

    // Stats animation on scroll
    gsap.fromTo(statsRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
    >
      {/* Background Pattern with grain effect */}
      <div className="absolute inset-0 bg-brand-cream/30 animate-grain -z-10" />

      <div className="container mx-auto px-4 pt-[80px] sm:pt-[90px] md:pt-[100px] flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <div>
              <p
                ref={subheadingRef}
                className="text-brand-green-dark font-accent text-sm sm:text-base md:text-lg mb-2 md:mb-3"
              >
                Premium Rice Manufacturers
              </p>
              <h1
                ref={headingRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight mb-4 md:mb-6"
              >
                Quality Begins in Our <span className="text-primary">Mill</span>, Ends on Your <span className="text-brand-gold">Plate</span>
              </h1>
              <p
                ref={descriptionRef}
                className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl"
              >
                Discover our premium range of rice varieties, processed with state-of-the-art technology and backed by decades of expertise in rice manufacturing. From farm to packaging, we ensure the highest quality standards.
              </p>
            </div>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4"
            >
              <Button
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="font-accent w-full sm:w-auto group transition-all duration-300 hover:scale-105"
              >
                View Our Products
                <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <ContactDialog
                trigger={
                  <Button
                    size="lg"
                    variant="outline"
                  >
                    Contact Us
                  </Button>
                }
              />
            </div>

            {/* ISO Certification Tagline */}
            <div
              ref={taglineRef}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Shield className="w-4 h-4 text-primary" />
              <p className="font-medium">
                ISO 22000:2018 Certified for Food Safety Management System
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] order-1 lg:order-2">
            <div
              ref={imageRef}
              className="absolute inset-0 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden"
            >
              <Image
                src={HeroImg}
                alt="Premium Rice Manufacturing"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating decorative elements - hidden on small screens */}
            <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-brand-gold/10 rounded-full hidden sm:block" />
            <div className="absolute -bottom-6 md:-bottom-8 left-8 md:left-12 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div ref={statsRef} className="bg-brand-green py-6 md:py-8 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-heading font-bold">25+</p>
              <p className="text-xs md:text-sm text-white/80">Years of Excellence</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-heading font-bold">7+</p>
              <p className="text-xs md:text-sm text-white/80">Rice Varieties</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-heading font-bold">100%</p>
              <p className="text-xs md:text-sm text-white/80">Quality Assured</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-heading font-bold">24/7</p>
              <p className="text-xs md:text-sm text-white/80">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}