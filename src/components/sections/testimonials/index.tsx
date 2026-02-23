"use client";

import React, { useState, useEffect, RefObject } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAnimateOnScroll } from '@/hooks/use-animations';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Testimonial } from 'types/testimonial';

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Raj Patel",
    role: "Executive Chef, Spice Garden Restaurant",
    company: "Spice Garden Restaurant",
    quote: "The basmati rice from Annadaata Agro Industries has transformed our biryani. The aroma, texture, and flavor are consistently exceptional, making it our exclusive choice for our signature dishes.",
    avatar: "/placeholder-avatar-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Procurement Manager",
    company: "Global Foods Distributor",
    quote: "We've been distributing Annadaata Agro Industries' rice varieties for over 5 years. Their commitment to quality, reliable supply chain, and sustainable practices have made them our preferred partner for premium rice varieties.",
    avatar: "/placeholder-avatar-2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "Food Blogger",
    company: "Culinary Adventures Blog",
    quote: "As someone who tests numerous ingredients, Annadaata Agro Industries' organic brown rice stands out for its nutty flavor and perfect texture. It's become a staple in my kitchen and highly recommended to my followers.",
    avatar: "/placeholder-avatar-3.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "John Williams",
    role: "CEO",
    company: "Organic Market Chain",
    quote: "Our customers demand the best, and Annadaata Agro Industries delivers. Their commitment to organic farming and product integrity aligns perfectly with our brand values. A partnership we truly value.",
    avatar: "/placeholder-avatar-4.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Home Cook & Influencer",
    company: "Kitchen Stories",
    quote: "From everyday meals to special occasions, Annadaata Food Products' rice varieties have never disappointed. The perfect grain length and aroma of their basmati rice make every dish special.",
    avatar: "/placeholder-avatar-5.jpg",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);
  const { ref, isInView } = useAnimateOnScroll(0.2);

  // Determine how many testimonials to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) { // lg and above
        setDisplayedTestimonials(getTestimonialsToShow(3));
      } else if (width >= 640) { // md
        setDisplayedTestimonials(getTestimonialsToShow(2));
      } else { // sm
        setDisplayedTestimonials(getTestimonialsToShow(1));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  // Helper function to get the testimonials to be displayed
  const getTestimonialsToShow = (count: number): Testimonial[] => {
    const result: Testimonial[] = [];
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-brand-cream/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          ref={ref as RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Hear from chefs, distributors, and home cooks who have made Annadaata rice an essential part of their culinary journey.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Testimonials Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="h-full border-none shadow-md bg-white">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Quote marks */}
                    <div className="text-brand-gold text-4xl font-serif leading-none mb-4">
                      "
                    </div>

                    {/* Quote */}
                    <p className="text-foreground mb-6 flex-grow italic">
                      {testimonial.quote}
                    </p>

                    {/* Rating */}
                    <div className="flex my-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-brand-gold fill-brand-gold' : 'text-muted'}`}
                        />
                      ))}
                    </div>

                    {/* Author info */}
                    <div className="flex items-center mt-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-muted'}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              aria-label="Next testimonial"
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Featured Partners */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-heading font-medium mb-6 text-center">Trusted by Leading Brands & Restaurants</h3>

          <div className="flex flex-wrap justify-center items-center gap-10 mt-8">
            {/* Placeholder for partner logos */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="w-32 h-16 bg-white/50 rounded-md flex items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">Partner Logo</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}