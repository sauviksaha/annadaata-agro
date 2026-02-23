"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import gsap from 'gsap';

interface ContactDialogProps {
  productName?: string;
  trigger: React.ReactNode;
}

export function ContactDialog({ productName, trigger }: ContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const phoneNumber = "9064389085";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here

    // Show success animation
    setIsSubmitted(true);

    // Animate success message
    gsap.fromTo(
      ".success-message",
      {
        opacity: 0,
        y: 20,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );

    // Close dialog after 2 seconds
    setTimeout(() => {
      setOpen(false);
      // Reset form state after dialog is closed
      setTimeout(() => {
        setIsSubmitted(false);
      }, 300);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Product Inquiry</DialogTitle>
              <DialogDescription>
                {productName ? `Inquire about ${productName}` : 'Contact us for more information'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your requirements..."
                    className="min-h-[100px] resize-none"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Submit Inquiry
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={`tel:${phoneNumber}`}>
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="success-message py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-600">
                Thank You for Your Interest!
              </h3>
              <p className="text-muted-foreground">
                We've received your inquiry and will reach out to you within 24 hours.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 