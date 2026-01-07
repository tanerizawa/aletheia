'use client';

import { useState, useEffect, useRef } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import type { Rendition } from 'epubjs';

interface EpubReaderProps {
  url: string;
  title: string;
}

interface ReaderTheme {
  name: string;
  background: string;
  color: string;
}

const themes: ReaderTheme[] = [
  { name: 'light', background: '#FAF8F5', color: '#1A1A1A' },
  { name: 'sepia', background: '#F5E6D3', color: '#3E3E3E' },
  { name: 'dark', background: '#1F1F1F', color: '#E8E3DB' },
];

export default function EpubReader({ url, title }: EpubReaderProps) {
  const [location, setLocation] = useState<string | number>(0);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<ReaderTheme>(themes[0]);
  const [showControls, setShowControls] = useState(true);
  const renditionRef = useRef<Rendition | undefined>(undefined);
  const [isRenditionReady, setIsRenditionReady] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const timeouts: number[] = [];
    const savedLocation = localStorage.getItem(`${title}-location`);
    const savedFontSize = localStorage.getItem('epub-fontSize');
    const savedTheme = localStorage.getItem('epub-theme');

    if (savedLocation) {
      timeouts.push(window.setTimeout(() => setLocation(savedLocation), 0));
    }
    if (savedFontSize) {
      timeouts.push(window.setTimeout(() => setFontSize(parseInt(savedFontSize)), 0));
    }
    if (savedTheme) {
      const themeObj = themes.find((t) => t.name === savedTheme);
      if (themeObj) timeouts.push(window.setTimeout(() => setTheme(themeObj), 0));
    }

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [title]);

  // Save location on change
  const onLocationChanged = (epubcfi: string) => {
    setLocation(epubcfi);
    localStorage.setItem(`${title}-location`, epubcfi);
  };

  // Apply theme and font size when rendition is ready
  const onRenditionReady = (rendition: Rendition) => {
    renditionRef.current = rendition;
    setIsRenditionReady(true);
    
    // Apply font size
    rendition.themes.fontSize(`${fontSize}px`);
    
    // Apply theme colors
    rendition.themes.override('color', theme.color);
    rendition.themes.override('background-color', theme.background);
    
    // Typography settings
    rendition.themes.override('font-family', '"Lora", Georgia, serif');
    rendition.themes.override('line-height', '1.6');
    rendition.themes.override('letter-spacing', '0.015em');
    rendition.themes.override('text-align', 'justify');
    rendition.themes.override('max-width', '650px');
    rendition.themes.override('margin', '0 auto');
    rendition.themes.override('padding', '2rem');
    
    // Paragraph spacing
    rendition.themes.override('p', 'margin-bottom: 1.5em;');
  };

  // Font size controls
  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24);
    setFontSize(newSize);
    localStorage.setItem('epub-fontSize', newSize.toString());
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${newSize}px`);
    }
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 14);
    setFontSize(newSize);
    localStorage.setItem('epub-fontSize', newSize.toString());
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${newSize}px`);
    }
  };

  // Theme switcher
  const switchTheme = (newTheme: ReaderTheme) => {
    setTheme(newTheme);
    localStorage.setItem('epub-theme', newTheme.name);
    if (renditionRef.current) {
      renditionRef.current.themes.override('color', newTheme.color);
      renditionRef.current.themes.override('background-color', newTheme.background);
    }
  };

  // Custom reader styles
  const readerStyles: typeof ReactReaderStyle = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: theme.background,
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div className="relative w-full h-screen">
      {/* Control Bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-teal-900 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Font Size Controls */}
          <div className="flex items-center gap-2 bg-white/95 rounded-lg px-3 py-2 shadow-lg">
            <button
              onClick={decreaseFontSize}
              className="w-8 h-8 flex items-center justify-center text-teal-900 hover:bg-teal-100 rounded transition-colors"
              aria-label="Decrease font size"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-sm font-medium text-teal-900 w-12 text-center">
              {fontSize}px
            </span>
            <button
              onClick={increaseFontSize}
              className="w-8 h-8 flex items-center justify-center text-teal-900 hover:bg-teal-100 rounded transition-colors"
              aria-label="Increase font size"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center gap-2 bg-white/95 rounded-lg px-3 py-2 shadow-lg">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => switchTheme(t)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  theme.name === t.name
                    ? 'border-teal-700 scale-110'
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: t.background }}
                aria-label={`${t.name} theme`}
                title={t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              />
            ))}
          </div>

          {/* Toggle Controls Button */}
          <button
            onClick={() => setShowControls(!showControls)}
            className="bg-white/95 rounded-lg px-3 py-2 shadow-lg text-teal-900 hover:bg-teal-50 transition-colors text-sm font-medium"
          >
            {showControls ? 'Hide Controls' : 'Show Controls'}
          </button>
        </div>
      </div>

      {/* EPUB Reader */}
      <div className="w-full h-full" onClick={() => setShowControls(!showControls)}>
        <ReactReader
          url={url}
          location={location}
          locationChanged={onLocationChanged}
          getRendition={onRenditionReady}
          readerStyles={readerStyles}
          epubOptions={{
            flow: 'paginated',
            manager: 'default',
            allowScriptedContent: false,
          }}
          showToc={true}
          tocChanged={(toc) => console.log('TOC changed:', toc)}
          swipeable
        />
      </div>

      {/* Loading State */}
      {!isRenditionReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream-soft-white/80 z-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
            <p className="text-teal-900 font-medium">Loading {title}...</p>
          </div>
        </div>
      )}
    </div>
  );
}
