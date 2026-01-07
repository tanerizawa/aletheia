'use client';

import { useEffect, useState } from 'react';

interface VisitHistory {
  path: string;
  timestamp: number;
  title?: string;
}

const STORAGE_KEY = 'academos_visit_history';
const MAX_HISTORY = 5; // Keep last 5 visits

/**
 * Custom hook for personalization features
 * Neuroscience: Recognition memory - users prefer familiar patterns
 * 
 * Features:
 * - Track visited pages
 * - Show "You were here" indicators
 * - Remember last visited section
 * - Suggest related content
 */
export function usePersonalization() {
  const [visitHistory, setVisitHistory] = useState<VisitHistory[]>([]);
  const [lastVisit, setLastVisit] = useState<VisitHistory | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const history = JSON.parse(stored) as VisitHistory[];
        setVisitHistory(history);
        setLastVisit(history[0] || null);
      }
    } catch (error) {
      console.error('Failed to load visit history:', error);
    }
  }, []);

  // Save current visit
  const recordVisit = (path: string, title?: string) => {
    if (typeof window === 'undefined') return;

    try {
      const newVisit: VisitHistory = {
        path,
        timestamp: Date.now(),
        title,
      };

      // Don't record if this is the same page as last visit
      if (visitHistory[0]?.path === path) return;

      // Add to history, keeping max length
      const updatedHistory = [newVisit, ...visitHistory].slice(0, MAX_HISTORY);
      
      setVisitHistory(updatedHistory);
      setLastVisit(newVisit);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to save visit:', error);
    }
  };

  // Check if user has visited a path before
  const hasVisited = (path: string): boolean => {
    return visitHistory.some(visit => visit.path === path);
  };

  // Get time since last visit (in ms)
  const getTimeSinceLastVisit = (path: string): number | null => {
    const visit = visitHistory.find(v => v.path === path);
    if (!visit) return null;
    return Date.now() - visit.timestamp;
  };

  // Clear history (for privacy)
  const clearHistory = () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(STORAGE_KEY);
      setVisitHistory([]);
      setLastVisit(null);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return {
    visitHistory,
    lastVisit,
    recordVisit,
    hasVisited,
    getTimeSinceLastVisit,
    clearHistory,
  };
}
