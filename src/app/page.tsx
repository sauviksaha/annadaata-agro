import React from 'react';
import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import About from '@/components/sections/about';
import Process from '@/components/sections/process';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Products />
      <About />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}