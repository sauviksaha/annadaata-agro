"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, Star, Shield, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { type RiceProduct, RICE_BLUR_PLACEHOLDER } from "@/constants/rice-products";

const CONTACT_PHONE = "+918670766439";

interface RiceImageDialogProps {
  product: RiceProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RiceImageDialog({ product, open, onOpenChange }: RiceImageDialogProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  React.useEffect(() => {
    setImgLoaded(false);
  }, [product?.id]);

  if (!product) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Panel */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100vw-2rem)] max-w-[440px]",
            "bg-white border border-stone-200 rounded-2xl overflow-hidden",
            "shadow-[0_20px_60px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.08)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "duration-200"
          )}
        >
          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-500 backdrop-blur-sm border border-stone-200/80 shadow-sm transition-all hover:bg-white hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Badge */}
          {(product.isFlagship || product.isPopular) && (
            <div
              className={cn(
                "absolute left-3 top-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md",
                product.isFlagship
                  ? "bg-brand-gold text-black"
                  : "bg-brand-green text-white"
              )}
            >
              {product.isFlagship ? (
                <Star className="w-3 h-3 fill-current" />
              ) : (
                <Shield className="w-3 h-3" />
              )}
              {product.isFlagship ? "Flagship" : "Popular"}
            </div>
          )}

          {/* Full-res image — 4:5 portrait, no layout shift */}
          <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden">
            {/* Skeleton + spinner loader */}
            <div
              className={cn(
                "absolute inset-0 overflow-hidden transition-opacity duration-500",
                imgLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              {/* Shimmer base */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              {/* Centered spinner */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                {/* Dual-ring spinner */}
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

            <Image
              src={product.image}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                imgLoaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) calc(100vw - 2rem), 440px"
              quality={90}
              placeholder="blur"
              blurDataURL={RICE_BLUR_PLACEHOLDER}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Product info */}
          <div className="px-5 pt-4 pb-3 border-t border-stone-100">
            <DialogPrimitive.Title className="font-heading font-bold text-foreground text-xl leading-tight">
              {product.name}
            </DialogPrimitive.Title>
            {product.subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground font-accent tracking-widest uppercase">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Contact CTA */}
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
