"use client";

import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, BrainIcon } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactDialog } from '@/components/dialogs/contact-dialog';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Rice product data
const riceProducts = [
  {
    id: 'jeerakhasala',
    name: 'Gobindobhog Rice (Jeerakhasala)',
    description: 'Our flagship premium aromatic rice variety, known for its distinctive flavor and aroma. Perfect for special occasions and premium dining experiences.',
    characteristics: ['Premium', 'Aromatic', 'Short Grain', 'Flagship Product'],
    packSizes: ['1kg', '5kg', '10kg', '25kg'],
    isPopular: true,
    isFlagship: true
  },
  {
    id: 'minikit',
    name: 'Minikit Rice',
    description: 'High-quality rice variety known for its small, fine grains and excellent cooking characteristics.',
    characteristics: ['Fine Grain', 'Easy Cooking', 'Versatile'],
    packSizes: ['1kg', '5kg', '10kg'],
    isPopular: false
  },
  {
    id: 'swarna',
    name: 'Swarna Rice (Bodhana)',
    description: 'Popular variety known for its balanced nutrition and excellent yield. Perfect for everyday consumption.',
    characteristics: ['Nutritious', 'Medium Grain', 'Daily Use'],
    packSizes: ['1kg', '5kg', '10kg', '25kg'],
    isPopular: true
  },
  {
    id: 'kuruva',
    name: 'Kuruva Rice',
    description: 'Traditional rice variety with unique taste and texture, ideal for special dishes.',
    characteristics: ['Traditional', 'Unique Flavor', 'Special Purpose'],
    packSizes: ['1kg', '5kg'],
    isPopular: false
  },
  {
    id: 'ir36',
    name: 'IR-36 Rice',
    description: 'High-yielding variety known for its consistent quality and excellent cooking properties.',
    characteristics: ['High Quality', 'Consistent', 'All-Purpose'],
    packSizes: ['1kg', '5kg', '10kg'],
    isPopular: false
  },
  {
    id: 'banshkathi',
    name: 'Banshkathi Rice',
    description: 'Premium long-grain rice variety with excellent aroma and taste.',
    characteristics: ['Long Grain', 'Aromatic', 'Premium Quality'],
    packSizes: ['1kg', '5kg', '10kg'],
    isPopular: true
  },
  {
    id: '1010',
    name: '10-10 Rice',
    description: 'Specially cultivated variety known for its balanced properties and versatile use.',
    characteristics: ['Balanced', 'Versatile', 'All-Season'],
    packSizes: ['1kg', '5kg', '10kg'],
    isPopular: false
  }
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
      }
    });

    // Heading animation
    tl.fromTo(headingRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // Cards stagger animation
    gsap.fromTo(
      ".product-card",
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top bottom-=100",
          end: "bottom center",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-20 md:py-32 bg-gradient-to-b from-background to-brand-cream/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/grain-pattern.png')] opacity-5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div
          ref={headingRef}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Premium <span className="text-primary">Rice</span> Collection
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Discover our exquisite range of premium rice varieties, each carefully selected and processed to deliver exceptional quality and taste.
          </p>
        </div>

        {/* Products Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {riceProducts.map((product) => (
            <Card
              key={product.id}
              className={`product-card group relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col ${product.isFlagship ? 'border-brand-gold ring-1 ring-brand-gold/20' : ''
                }`}
            >
              <CardHeader className="flex-none pb-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  {(product.isPopular || product.isFlagship) && (
                    <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${product.isFlagship
                      ? 'bg-brand-gold/10 text-brand-gold'
                      : 'bg-brand-green/10 text-brand-green'
                      }`}>
                      {product.isFlagship ? <Star className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                      <span className="font-medium">
                        {product.isFlagship ? 'Flagship Product' : 'Popular Choice'}
                      </span>
                    </div>
                  )}
                </div>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col space-y-6">
                {/* Characteristics */}
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <BrainIcon className="w-4 h-4 text-brand-green" />
                    Characteristics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.characteristics.map((char) => (
                      <span
                        key={char}
                        className="text-sm bg-brand-green/10 text-brand-green px-3 py-1 rounded-full"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pack Sizes */}
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-3">Available Pack Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.packSizes.map((size) => (
                      <span
                        key={size}
                        className="text-sm bg-muted px-3 py-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <div className="pt-4">
                  <ContactDialog
                    productName={product.name}
                    trigger={
                      <Button
                        className="w-full group/btn hover:bg-brand-green h-12 text-base"
                      >
                        Enquire Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}