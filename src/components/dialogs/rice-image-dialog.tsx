"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, Star, Shield, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RICE_PRODUCTS, RICE_BLUR_PLACEHOLDER, type RiceProduct } from "@/constants/rice-products";

const CONTACT_PHONE = "+919064389085";

interface RiceImageDialogProps {
  product: RiceProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RiceImageDialog({ product, open, onOpenChange }: RiceImageDialogProps) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [animKey, setAnimKey] = React.useState(0);
  const touchStartX = React.useRef(0);

  // Sync index when a product is selected from the grid
  React.useEffect(() => {
    if (product) {
      const idx = RICE_PRODUCTS.findIndex((p) => p.id === product.id);
      setCurrentIdx(idx >= 0 ? idx : 0);
    }
  }, [product?.id]);

  // Reset loader & trigger slide animation on every index change
  React.useEffect(() => {
    setImgLoaded(false);
    setAnimKey((k) => k + 1);
  }, [currentIdx]);

  const navigate = React.useCallback((dir: "prev" | "next") => {
    setCurrentIdx((i) =>
      dir === "next"
        ? (i + 1) % RICE_PRODUCTS.length
        : (i - 1 + RICE_PRODUCTS.length) % RICE_PRODUCTS.length
    );
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 44) navigate(delta < 0 ? "next" : "prev");
  };

  if (!product) return null;

  const currentProduct = RICE_PRODUCTS[currentIdx];
  const total = RICE_PRODUCTS.length;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Panel */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100vw-2rem)] max-w-[400px]",
            "bg-white border border-stone-200/80 rounded-2xl overflow-hidden",
            "shadow-[0_24px_64px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.08)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "duration-200"
          )}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); navigate("next"); }
            if (e.key === "ArrowLeft")  { e.preventDefault(); navigate("prev"); }
          }}
        >
          {/* ── Close ─────────────────────────────────────────────────────────── */}
          <DialogPrimitive.Close className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-500 backdrop-blur-sm border border-stone-200/80 shadow-sm transition-all hover:bg-white hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* ── Image carousel area ──────────────────────────────────────────── */}
          <div
            className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Badge */}
            {(currentProduct.isFlagship || currentProduct.isPopular) && (
              <div
                className={cn(
                  "absolute left-3 top-3 z-10 flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full",
                  "bg-white/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.12)] border",
                  currentProduct.isFlagship ? "border-amber-200/60" : "border-green-200/60"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-4 h-4 rounded-full shadow-sm",
                    currentProduct.isFlagship ? "bg-brand-gold" : "bg-brand-green"
                  )}
                >
                  {currentProduct.isFlagship
                    ? <Star className="w-2.5 h-2.5 fill-white text-white" />
                    : <Shield className="w-2.5 h-2.5 text-white" />
                  }
                </span>
                <span
                  className={cn(
                    "text-[11px] font-semibold tracking-wide font-accent",
                    currentProduct.isFlagship ? "text-amber-800" : "text-green-900"
                  )}
                >
                  {currentProduct.isFlagship ? "Flagship" : "Popular"}
                </span>
              </div>
            )}

            {/* Skeleton + dual-ring spinner */}
            <div
              className={cn(
                "absolute inset-0 overflow-hidden transition-opacity duration-500 z-[1]",
                imgLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full border-2 border-stone-200" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-green animate-spin" />
                  <div
                    className="absolute inset-[5px] rounded-full border-2 border-transparent border-t-brand-gold animate-spin"
                    style={{ animationDuration: "0.9s", animationDirection: "reverse" }}
                  />
                </div>
                <span className="text-[11px] font-accent tracking-widest uppercase text-stone-400 select-none">
                  Loading
                </span>
              </div>
            </div>

            {/* Animated image — key remounts on each navigation, triggering CSS animation */}
            <div key={animKey} className="absolute inset-0 animate-[dialogSlide_0.32s_ease-out_both]">
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className={cn(
                  "object-cover transition-opacity duration-500",
                  imgLoaded ? "opacity-100" : "opacity-0"
                )}
                sizes="(max-width: 640px) calc(100vw - 2rem), 400px"
                quality={90}
                placeholder="blur"
                blurDataURL={RICE_BLUR_PLACEHOLDER}
                onLoad={() => setImgLoaded(true)}
              />
            </div>

            {/* Bottom gradient — scrim for arrows + dots */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent pointer-events-none z-10" />

            {/* Prev arrow */}
            <button
              onClick={() => navigate("prev")}
              aria-label="Previous variety"
              className={cn(
                "absolute left-3 top-1/2 -translate-y-6 z-10",
                "flex items-center justify-center w-9 h-9 rounded-full",
                "bg-white/80 backdrop-blur-sm border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.14)]",
                "text-stone-700 hover:bg-white hover:text-stone-900 hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]",
                "transition-all duration-200 hover:scale-105 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-white/50"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next arrow */}
            <button
              onClick={() => navigate("next")}
              aria-label="Next variety"
              className={cn(
                "absolute right-3 top-1/2 -translate-y-6 z-10",
                "flex items-center justify-center w-9 h-9 rounded-full",
                "bg-white/80 backdrop-blur-sm border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.14)]",
                "text-stone-700 hover:bg-white hover:text-stone-900 hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]",
                "transition-all duration-200 hover:scale-105 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-white/50"
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
              {RICE_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  aria-label={`Go to ${RICE_PRODUCTS[i].name}`}
                  className={cn(
                    "rounded-full transition-all duration-300 focus:outline-none",
                    i === currentIdx
                      ? "w-5 h-[5px] bg-white shadow-sm"
                      : "w-[5px] h-[5px] bg-white/45 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          </div>

          {/* ── Product info ─────────────────────────────────────────────────── */}
          <div className="px-5 pt-4 pb-3 border-t border-stone-100">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogPrimitive.Title className="font-heading font-bold text-foreground text-xl leading-tight truncate">
                  {currentProduct.name}
                </DialogPrimitive.Title>
                {currentProduct.subtitle && (
                  <p className="mt-0.5 text-xs text-muted-foreground font-accent tracking-widest uppercase">
                    {currentProduct.subtitle}
                  </p>
                )}
              </div>
              {/* x / total counter */}
              <div className="shrink-0 flex items-center gap-1 mt-0.5">
                <span className="text-sm font-heading font-bold text-foreground tabular-nums">
                  {currentIdx + 1}
                </span>
                <span className="text-[11px] text-muted-foreground/50 font-accent">
                  / {total}
                </span>
              </div>
            </div>
          </div>

          {/* ── Contact CTA ──────────────────────────────────────────────────── */}
          <div className="px-5 pb-5">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className={cn(
                "flex items-center justify-center gap-2.5 w-full",
                "h-11 px-5 rounded-xl",
                "bg-brand-green text-white font-accent font-semibold text-sm",
                "ring-offset-white transition-all duration-200",
                "hover:bg-brand-green-dark active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2",
                "shadow-[0_2px_12px_rgba(46,125,50,0.25)]"
              )}
            >
              <Phone className="w-4 h-4 shrink-0" />
              Contact Us
            </a>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
