"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Star, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RICE_PRODUCTS, RICE_BLUR_PLACEHOLDER, type RiceProduct } from '@/constants/rice-products';
import { RiceImageDialog } from '@/components/dialogs/rice-image-dialog';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Above-the-fold threshold: mark first N thumbnails as priority (LCP candidates)
const PRIORITY_COUNT = 4;

function ProductCard({
  product,
  index,
  onClick,
}: {
  product: RiceProduct;
  index: number;
  onClick: (product: RiceProduct) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const isPriority = index < PRIORITY_COUNT;

  return (
    <button
      type="button"
      onClick={() => onClick(product)}
      className={cn(
        'product-card group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'transition-transform duration-300 ease-out hover:-translate-y-1 active:scale-[0.98]',
        product.isFlagship && 'ring-1 ring-brand-gold/35 shadow-[0_4px_24px_rgba(212,175,55,0.12)]'
      )}
      aria-label={`View ${product.name}${product.subtitle ? ` (${product.subtitle})` : ''}`}
    >
      {/* Fixed 4:5 aspect ratio — prevents CLS */}
      <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden rounded-xl">
        {/* Skeleton shimmer */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden transition-opacity duration-500',
            loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </div>

        {/* Thumbnail image */}
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-all duration-500 ease-out',
            'group-hover:scale-105',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={80}
          priority={isPriority}
          placeholder="blur"
          blurDataURL={RICE_BLUR_PLACEHOLDER}
          onLoad={() => setLoaded(true)}
        />

        {/* Permanent gradient overlay — bottom fade for legible text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />

        {/* Badge */}
        {product.isFlagship && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.12)] border border-amber-200/60">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-gold shadow-sm">
              <Star className="w-2.5 h-2.5 fill-white text-white" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-amber-800 font-accent">Flagship</span>
          </div>
        )}
        {!product.isFlagship && product.isPopular && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.12)] border border-green-200/60">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-green shadow-sm">
              <Shield className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-green-900 font-accent">Popular</span>
          </div>
        )}

        {/* Name — pinned to bottom, rises on hover */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-heading font-bold text-white text-base leading-tight drop-shadow">
            {product.name}
          </p>
          {product.subtitle && (
            <p className="text-white/60 text-xs mt-0.5 font-accent tracking-widest uppercase">
              {product.subtitle}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<RiceProduct | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = useCallback((product: RiceProduct) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  }, []);

  const handleDialogChange = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Keep product in state until dialog fully closes so image doesn't flash away
      setTimeout(() => setSelectedProduct(null), 300);
    }
  }, []);

  useEffect(() => {
    // ── Section heading ───────────────────────────────────────────────────────
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top bottom-=80' },
      }
    );

    // ── Cards: row-aware stagger ──────────────────────────────────────────────
    // Tighter stagger (0.07s) keeps the wave crisp across 4 cols
    gsap.fromTo(
      '.product-card',
      { opacity: 0, y: 36, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top bottom-=60',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-20 md:py-32 bg-gradient-to-b from-background to-brand-cream/10 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 bg-[url('/grain-pattern.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5">
            Premium <span className="text-primary">Rice</span> Collection
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Discover our exquisite range of premium rice varieties, each carefully selected and
            processed to deliver exceptional quality and taste.
          </p>
        </div>

        {/* Grid — 2 cols mobile · 3 cols tablet · 4 cols desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {RICE_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <RiceImageDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={handleDialogChange}
      />
    </section>
  );
}
