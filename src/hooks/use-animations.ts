import { useState, useEffect, useRef } from 'react';

/**
 * A hook that detects when an element is visible in the viewport
 * and triggers animations or other effects
 * 
 * @param threshold The visibility threshold (0-1) that triggers the animation
 * @returns An object containing ref to attach to the element and isInView state
 */
export function useAnimateOnScroll(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsInView(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold, // percentage of the target element that is visible
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
}

/**
 * A hook that provides responsive behaviors
 * @returns Boolean indicating if the device is mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
}