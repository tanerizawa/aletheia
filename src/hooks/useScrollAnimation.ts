'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number; // 0-1, percentage of element visible to trigger
  triggerOnce?: boolean; // Only trigger animation once
  rootMargin?: string; // Margin around root
}

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Neuroscience principle: Progressive disclosure - reveal content as user scrolls
 * 
 * @param options - Configuration for intersection observer
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -50px 0px', // Trigger slightly before element enters viewport
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // Defer state update to avoid calling setState synchronously in the effect
      const t = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            hasTriggered.current = true;

            // If triggerOnce, disconnect observer after first trigger
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce && hasTriggered.current) {
            // Allow re-triggering if triggerOnce is false
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref: elementRef, isVisible };
}
