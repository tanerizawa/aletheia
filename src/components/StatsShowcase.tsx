'use client';

import React, { useState, useEffect } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const iconTemplates = {
  books: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  articles: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  events: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  year: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
};

export default function StatsShowcase() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/public/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();

        const statsData: Stat[] = [
          {
            label: "E-Books",
            value: data.ebooks.total,
            suffix: "",
            icon: iconTemplates.books
          },
          {
            label: "Artikel Published",
            value: data.articles.published,
            suffix: "",
            icon: iconTemplates.articles
          },
          {
            label: "Total Events",
            value: data.events.total,
            suffix: "",
            icon: iconTemplates.events
          },
          {
            label: "Tahun Berdiri",
            value: 2025,
            suffix: "",
            icon: iconTemplates.year
          }
        ];

        setStats(statsData);
        setCounts(statsData.map(() => 0));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to default stats if API fails
        const fallbackStats: Stat[] = [
          {
            label: "E-Books",
            value: 0,
            suffix: "",
            icon: iconTemplates.books
          },
          {
            label: "Artikel Published",
            value: 0,
            suffix: "",
            icon: iconTemplates.articles
          },
          {
            label: "Total Events",
            value: 0,
            suffix: "",
            icon: iconTemplates.events
          },
          {
            label: "Tahun Berdiri",
            value: 2025,
            suffix: "",
            icon: iconTemplates.year
          }
        ];
        setStats(fallbackStats);
        setCounts(fallbackStats.map(() => 0));
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    if (hasAnimated) return;
    if (!stats || stats.length === 0) return; // wait for stats to load

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;
    const timers: NodeJS.Timeout[] = [];

    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = stat.value;
            return newCounts;
          });
          clearInterval(timer);
        } else {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });
        }
      }, interval);

      timers.push(timer);
    });

    setHasAnimated(true);

    return () => {
      timers.forEach(t => clearInterval(t));
    };
  }, [hasAnimated, stats]);

  return (
    <section className="py-16 lg:py-20 bg-teal-700" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">Statistik Perpustakaan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-teal-800 bg-opacity-50 rounded border-2 border-terra-700 hover:bg-opacity-70 transition-all group"
            >
              <div className="text-terra-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="font-serif text-5xl font-bold text-cream-50 mb-2">
                {counts[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-cream-100 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
