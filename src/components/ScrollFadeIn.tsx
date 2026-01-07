'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number; // Delay in ms (0, 100, 200, etc.)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Wrapper component for scroll-triggered fade-in animations
 * Neuroscience: Dopamine release from smooth animations (200-300ms optimal)
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in ms (for staggered effects)
 * @param direction - Direction of slide animation
 * @param className - Additional CSS classes
 * @param threshold - Intersection observer threshold (0-1)
 * @param triggerOnce - Whether animation only triggers once
 */
export default function ScrollFadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}: ScrollFadeInProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  // Calculate transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(30px)';
        case 'down':
          return 'translateY(-30px)';
        case 'left':
          return 'translateX(30px)';
        case 'right':
          return 'translateX(-30px)';
        case 'none':
          return 'none';
      }
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
