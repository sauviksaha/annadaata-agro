"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ArrowRight, ChevronRight, Mail, Facebook, Twitter, Instagram, Linkedin, X, CheckCircle, Loader2 } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Social Media Links
const socialLinks = [
  {
    name: 'Facebook',
    icon: <Facebook className="h-5 w-5" />,
    url: '/',
  },
  {
    name: 'Twitter',
    icon: <Twitter className="h-5 w-5" />,
    url: '/',
  },
  {
    name: 'Instagram',
    icon: <Instagram className="h-5 w-5" />,
    url: '/',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="h-5 w-5" />,
    url: '/',
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [email, setEmail] = useState('');

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.from(".footer-content", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 90%",
        },
      });

      // Links columns animation
      gsap.from(".footer-links-column", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".footer-links-column",
          start: "top 85%",
        },
      });

      // Social links animation
      gsap.from(".social-links a", {
        opacity: 0,
        y: 10,
        duration: 0.3,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".social-links",
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Footer links data
  const footerLinks = {
    products: [
      { name: "Gobindobhog Rice", href: "/#products" },
      { name: "Minikit Rice", href: "/#products" },
      { name: "Swarna Rice", href: "/#products" },
      { name: "Kuruva Rice", href: "/#products" },
      { name: "Banshkathi Rice", href: "/#products" },
    ],
    company: [
      { name: "About Us", href: "/#about" },
      { name: "Our Process", href: "/#process" },
      { name: "Sustainability", href: "/#sustainability" },
      { name: "Careers", href: "/#careers" },
      { name: "Certifications", href: "/#certifications" },
    ],
    // resources: [
    //   { name: "Rice Cooking Guide", href: "/resources" },
    //   { name: "Recipe Collection", href: "/recipes" },
    //   { name: "FAQ", href: "/faq" },
    //   { name: "Certifications", href: "/certifications" },
    //   { name: "Downloads", href: "/downloads" },
    // ],
    support: [
      { name: "Contact Us", href: "/#contact" },
      { name: "Customer Support", href: "/support" },
      { name: "Distributor Inquiries", href: "/distributors" },
      { name: "International Orders", href: "/international" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Newsletter subscription for:", email);
      setShowSuccessDialog(true);
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer ref={footerRef} className="bg-brand-green-dark text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-bold text-white">
                Annadaata <span className="text-brand-gold">Agro Industries</span>
              </span>
            </Link>

            <p className="text-white/80 mb-6 max-w-md">
              Committed to delivering premium quality rice products while embracing sustainable agriculture practices and supporting farming communities.
            </p>

            {/* Social Links */}
            <div className="social-links mt-6 mb-8">
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="mt-8">
              <h4 className="font-medium mb-4">Subscribe to our Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-green-dark" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="pl-10 bg-white text-brand-green-dark border-none"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div
              key={category}
              className="footer-links-column"
            >
              <h4 className="font-heading font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/20" />

        {/* Bottom footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Annadaata Agro Industries Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/70 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/70 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="flex justify-center mt-8">
          <Button
            size="icon"
            variant="outline"
            className="bg-transparent border-white/20 hover:bg-white/10 rounded-full"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-auto relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-brand-green" />
              </div>
              <h4 className="text-xl font-heading font-medium mb-2 text-gray-900">Successfully Subscribed!</h4>
              <p className="text-muted-foreground mb-6">
                Thank you for subscribing to our newsletter. You'll be the first to know about our latest updates and offers.
              </p>
              <Button
                onClick={() => setShowSuccessDialog(false)}
                className="bg-brand-green hover:bg-brand-green/90 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}