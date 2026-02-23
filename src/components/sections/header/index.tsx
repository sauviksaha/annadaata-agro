"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ContactDialog } from '@/components/dialogs/contact-dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from '@/assets/logo.png';

const navItems = [
  { name: "Home", path: "/#hero" },
  { name: "Products", path: "/#products" },
  { name: "About Us", path: "/#about" },
  // { name: "Our Process", path: "/#process" },
  // { name: "Sustainability", path: "/#sustainability" },
  { name: "Contact", path: "/#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = () => {
    setIsSheetOpen(false);
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSheetOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-sm shadow-md h-[64px] sm:h-[72px] md:h-[80px]'
          : 'bg-transparent h-[64px] sm:h-[72px] md:h-[80px]'
      )}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Annadaata Agro Industries"
            width={40}
            height={40}
            className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(74%)_saturate(803%)_hue-rotate(93deg)_brightness(93%)_contrast(96%)]"
            priority
          />
          <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-primary">
            Annadaata <span className="text-brand-gold">Agro Industries</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link
                  href={item.path}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(
                      "px-4 py-2 text-sm font-accent rounded-md transition-colors",
                      pathname === item.path || (pathname === '/' && item.path.startsWith('/#'))
                        ? "text-primary font-medium"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Contact Button - Desktop */}
        <div className="hidden md:block">
          <ContactDialog
            trigger={
              <Button size="sm" className="font-accent">
                Get a Quote
              </Button>
            }
          />
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col h-full">
            <SheetHeader className="px-6 border-b py-4">
              <SheetTitle className="text-left font-heading">
                Navigation Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col flex-1 overflow-hidden">
              <nav className="flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={handleNavigation}
                    className={cn(
                      "flex items-center px-6 py-4 text-base font-accent transition-colors border-b border-border",
                      pathname === item.path || (pathname === '/' && item.path.startsWith('/#'))
                        ? "text-primary font-medium bg-primary/5"
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t">
                <Button
                  size="lg"
                  className="w-full font-accent"
                // onClick={handleQuoteClick}
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}