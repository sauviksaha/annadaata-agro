"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  X,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().optional(),
});

// Contact details
const contactDetails = [
  {
    icon: <Phone className="h-5 w-5 text-primary" />,
    title: "Phone",
    details: "+91 90643 89085, +91 98321 70531",
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: "Email",
    details: "industries.annadaataagro@gmail.com",
  },
  {
    icon: <Clock className="h-5 w-5 text-primary" />,
    title: "Business Hours",
    details: "Monday - Sunday: 9:00 AM - 8:00 PM",
  },
  {
    icon: <MapPin className="h-5 w-5 text-primary" />,
    title: "Address",
    details: "Baharampur, Shyamsundar, Bardhaman - 713424, West Bengal, India",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".section-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 80%",
        },
      });

      // Contact info items animation
      gsap.from(".contact-info-item", {
        opacity: 0,
        x: -30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-info-container",
          start: "top 75%",
        },
      });

      // Form animation
      gsap.from(".contact-form", {
        opacity: 0,
        x: 30,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(values);
      setShowSuccessDialog(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6">
            Get in <span className="text-primary">Touch</span> With Us
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            Have questions about our products or interested in placing an order? Our team is here to help you with all your rice-related inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="contact-info-container bg-brand-green/5 p-6 sm:p-8 rounded-xl h-full">
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-6">Contact Information</h3>

              <div className="space-y-6">
                {contactDetails.map((detail, index) => (
                  <div key={detail.title} className="contact-info-item flex items-start">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full shrink-0">
                      {detail.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-sm sm:text-base">{detail.title}</h4>
                      <p className="text-muted-foreground text-sm sm:text-base mt-1">{detail.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div className="mt-8 rounded-lg overflow-hidden h-[200px] sm:h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.9861247556386!2d87.84786397507825!3d23.128103885895523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f839007f2165ad%3A0xe910997d0448075b!2sAnnadaata%20Agro%20Industries%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1710425163089!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Annadaata Agro Industries Private Limited Location"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="contact-form bg-white rounded-xl p-6 sm:p-8 shadow-sm border">
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-6">Send Us a Message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Subject Field */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                                <SelectItem value="order-information">Order Information</SelectItem>
                                <SelectItem value="bulk-purchase">Bulk Purchase</SelectItem>
                                <SelectItem value="distribution">Become a Distributor</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your message here..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-auto relative">
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-heading font-medium mb-2">Message Sent Successfully!</h4>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. Our team will get back to you as soon as possible.
              </p>
              <Button
                onClick={() => setShowSuccessDialog(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}