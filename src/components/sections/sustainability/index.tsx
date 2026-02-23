"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Droplets, Sprout, Recycle, Users, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Sustainability initiatives data
const initiatives = [
  {
    title: "Organic Farming",
    description: "We promote organic farming methods that avoid chemical pesticides and fertilizers, preserving soil health and biodiversity.",
    icon: <Leaf className="h-10 w-10" />,
    color: "from-green-400/20 to-green-500/20",
  },
  {
    title: "Water Conservation",
    description: "Our innovative irrigation systems reduce water usage by up to 40% compared to traditional rice farming methods.",
    icon: <Droplets className="h-10 w-10" />,
    color: "from-blue-400/20 to-blue-500/20",
  },
  {
    title: "Sustainable Packaging",
    description: "We use biodegradable and recyclable materials for all our packaging needs, minimizing environmental impact.",
    icon: <Recycle className="h-10 w-10" />,
    color: "from-purple-400/20 to-purple-500/20",
  },
  {
    title: "Farmer Welfare",
    description: "We ensure fair compensation and provide training on sustainable farming practices to our network of farmers.",
    icon: <Users className="h-10 w-10" />,
    color: "from-orange-400/20 to-orange-500/20",
  },
  {
    title: "Zero Waste Production",
    description: "Rice husk and other by-products are repurposed into biofuel and other useful materials, achieving near-zero waste.",
    icon: <Sprout className="h-10 w-10" />,
    color: "from-teal-400/20 to-teal-500/20",
  },
  {
    title: "Carbon Footprint Reduction",
    description: "Our processing facilities use renewable energy sources, reducing our carbon footprint by up to 30%.",
    icon: <Award className="h-10 w-10" />,
    color: "from-red-400/20 to-red-500/20",
  }
];

const ImpactCard = ({ number, label, delay }: { number: string; label: string; delay: number }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setIsInView(true)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-xl blur-xl group-hover:scale-110 transition-transform duration-300" />
      <div className="relative p-6 text-center">
        <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {number}
        </div>
        <p className="text-sm text-white/80">{label}</p>
      </div>
    </motion.div>
  );
};

export default function Sustainability() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeInitiative, setActiveInitiative] = useState<number | null>(null);

  useEffect(() => {
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach((element) => {
      gsap.to(element, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Animate content on scroll
    gsap.from('.content-fade-in', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.content-fade-in',
        start: 'top 80%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-brand-green-light/10"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-brand-green/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="parallax absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-radial from-brand-gold/5 to-transparent rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8 content-fade-in">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="text-primary font-accent tracking-wider">
                  SUSTAINABILITY
                </h4>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                  Committed to{' '}
                  <span className="text-primary">Earth</span> and{' '}
                  <span className="text-brand-gold">Community</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground space-y-4 text-lg"
              >
                <p>
                  At Annadaata Agro Industries, sustainability isn't just a buzzword—it's integrated into every aspect of our operations. We believe that the finest rice comes from healthy ecosystems and thriving farming communities.
                </p>
                <p>
                  Our commitment extends from the fields where our rice is grown to the manufacturing processes and all the way to your table.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden font-accent bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Our Sustainability Report
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-brand-green/20 to-transparent rounded-2xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/sustainability.webp"
                  alt="Sustainable Rice Farming"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-6 right-6"
            >
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 bg-brand-green/10 rounded-lg flex items-center justify-center p-3">
                  <Image
                    src="/organic-cert.svg"
                    alt="Organic Certification"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-6 left-6"
            >
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 bg-brand-gold/10 rounded-lg flex items-center justify-center p-3">
                  <Image
                    src="/fair-trade.svg"
                    alt="Fair Trade Certificate"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Initiatives Grid */}
        <div className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-heading font-semibold mb-16 text-center"
          >
            Our Sustainability Initiatives
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setActiveInitiative(index)}
                onHoverEnd={() => setActiveInitiative(null)}
              >
                <Card className="h-full group relative bg-white/50 backdrop-blur-sm border-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${initiative.color} opacity-40 rounded-xl transition-opacity duration-300 group-hover:opacity-60`} />
                  <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-8">
                    <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-4 rounded-full text-white">
                          {initiative.icon}
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-heading font-medium mb-4">{initiative.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{initiative.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-green/90 rounded-2xl blur-xl opacity-60" />
          <div className="relative bg-gradient-to-br from-brand-green to-brand-green/90 p-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay" />

            <h3 className="text-3xl font-heading text-center text-white mb-16">Our Impact in Numbers</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <ImpactCard number="40%" label="Water Saved" delay={0} />
              <ImpactCard number="30%" label="Carbon Reduction" delay={0.2} />
              <ImpactCard number="5000+" label="Farmers Supported" delay={0.4} />
              <ImpactCard number="95%" label="Waste Recycled" delay={0.6} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}