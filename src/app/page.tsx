"use client";

import React, { useEffect } from 'react';
import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import About from '@/components/sections/about';
import Process from '@/components/sections/process';
import Sustainability from '@/components/sections/sustainability';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

export default function Home() {
  // Add custom styles for animations
  useEffect(() => {
    // Add grain animation to the animated elements
    const style = document.createElement('style');
    style.textContent = `
      @keyframes grain {
        0%, 100% { transform: translate(0, 0) }
        10% { transform: translate(-5%, -10%) }
        20% { transform: translate(-15%, 5%) }
        30% { transform: translate(7%, -25%) }
        40% { transform: translate(-5%, 25%) }
        50% { transform: translate(-15%, 10%) }
        60% { transform: translate(15%, 0%) }
        70% { transform: translate(0%, 15%) }
        80% { transform: translate(3%, 35%) }
        90% { transform: translate(-10%, 10%) }
      }

      .animate-grain {
        position: relative;
      }

      .animate-grain::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='.1'/%3E%3C/svg%3E");
        opacity: 0.15;
        pointer-events: none;
        animation: grain 8s steps(10) infinite;
      }

      .animate-slow-spin {
        animation: slow-spin 30s linear infinite;
      }

      @keyframes slow-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Products />
      <About />
      <Process />
      {/* <Sustainability /> */}
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </main>
  );
}