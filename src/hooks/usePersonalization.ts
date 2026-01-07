'use client';

import { useState } from 'react';

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
  // Lazily initialize from localStorage to avoid setting state inside an effect
  const [visitHistory, setVisitHistory] = useState<VisitHistory[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as VisitHistory[]) : [];
    } catch (error) {
      console.error('Failed to read visit history during init:', error);
      return [];
    }
  });

  const [lastVisit, setLastVisit] = useState<VisitHistory | null>(() => {
    try {
      if (typeof window === 'undefined') return null;
      const stored = localStorage.getItem(STORAGE_KEY);
      const history = stored ? (JSON.parse(stored) as VisitHistory[]) : [];
      return history[0] || null;
    } catch (error) {
      console.error('Failed to read last visit during init:', error);
      return null;
    }
  });

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
