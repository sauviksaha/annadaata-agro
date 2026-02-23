"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactDialog } from '@/components/dialogs/contact-dialog';
import Logo from '@/assets/logo.png';

const NAV_ITEMS = [
  { label: 'Home',       href: '/#hero' },
  { label: 'Products',   href: '/#products' },
  { label: 'About Us',   href: '/#about' },
  { label: 'Our Process',href: '/#process' },
  { label: 'Contact',    href: '/#contact' },
];

const PHONE = '+919064389085';
const PHONE_DISPLAY = '+91 90643 89085';

const LOGO_FILTER =
  '[filter:brightness(0)_saturate(100%)_invert(39%)_sepia(74%)_saturate(803%)_hue-rotate(93deg)_brightness(93%)_contrast(96%)]';

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const close = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'h-16 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-[0_1px_20px_rgba(0,0,0,0.07)]'
            : 'h-20 bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src={Logo}
              alt="Annadaata Agro Industries"
              width={36}
              height={36}
              className={cn('transition-transform duration-300 group-hover:scale-110', LOGO_FILTER)}
              priority
            />
            <div className="leading-none">
              <span className="block text-[15px] font-heading font-bold text-primary tracking-tight">
                Annadaata
              </span>
              <span className="block text-[11px] font-accent text-brand-gold tracking-[0.12em] uppercase mt-0.5">
                Agro Industries
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-3.5 py-2 text-sm font-accent text-foreground/65 hover:text-primary transition-colors duration-200 group"
              >
                {item.label}
                {/* animated underline */}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 text-[13px] font-accent text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>

            <div className="w-px h-4 bg-stone-200" />

            <ContactDialog
              trigger={
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-green text-white text-sm font-accent font-semibold hover:bg-brand-green-dark active:scale-[0.97] transition-all duration-200 shadow-[0_2px_10px_rgba(46,125,50,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50">
                  Get a Quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            />
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            className={cn(
              'md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40',
              scrolled ? 'text-foreground hover:bg-stone-100' : 'text-foreground hover:bg-white/20'
            )}
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] md:hidden transition-opacity duration-300',
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex flex-col w-[82vw] max-w-[320px] bg-white md:hidden',
          'transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-stone-100">
          <Link href="/" onClick={close} className="flex items-center gap-2.5 group">
            <Image
              src={Logo}
              alt="Annadaata Agro Industries"
              width={30}
              height={30}
              className={cn('transition-transform duration-300 group-hover:scale-110', LOGO_FILTER)}
              priority
            />
            <div className="leading-none">
              <span className="block text-[14px] font-heading font-bold text-primary tracking-tight">
                Annadaata
              </span>
              <span className="block text-[10px] font-accent text-brand-gold tracking-[0.12em] uppercase mt-0.5">
                Agro Industries
              </span>
            </div>
          </Link>

          <button
            onClick={close}
            aria-label="Close navigation"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={close}
              className="group flex items-center justify-between px-5 py-4 text-[15px] font-accent font-medium text-foreground/75 hover:text-primary hover:bg-brand-green/[0.04] transition-all duration-200"
              style={{ transitionDelay: drawerOpen ? `${i * 30}ms` : '0ms' }}
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          ))}
        </nav>

        {/* Panel footer */}
        <div className="px-5 pb-6 pt-4 border-t border-stone-100 space-y-3">
          {/* Phone */}
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-stone-200 text-sm font-accent font-medium text-foreground/75 hover:border-brand-green/30 hover:text-brand-green transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>

          {/* CTA */}
          <ContactDialog
            trigger={
              <button className="w-full py-3 rounded-xl bg-brand-green text-white text-sm font-accent font-semibold hover:bg-brand-green-dark active:scale-[0.98] transition-all duration-200 shadow-[0_2px_12px_rgba(46,125,50,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40">
                Get a Quote
              </button>
            }
          />
        </div>
      </aside>
    </>
  );
}
