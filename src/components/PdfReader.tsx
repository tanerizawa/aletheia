'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - use local file to avoid CORS issues
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

interface PdfReaderProps {
  url: string;
  title: string;
}

interface ReaderTheme {
  name: string;
  background: string;
}

interface Highlight {
  id: string;
  page: number;
  text: string;
  color: string;
  comment?: string;
  timestamp: number;
  position?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const themes: ReaderTheme[] = [
  { name: 'light', background: '#FAF8F5' },
  { name: 'sepia', background: '#F5E6D3' },
  { name: 'dark', background: '#1F1F1F' },
];

export default function PdfReader({ url, title }: PdfReaderProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(2.2); // Default 60% dari lebar layar untuk tampilan optimal
  const [theme, setTheme] = useState<ReaderTheme>(themes[0]);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [showCommentPanel, setShowCommentPanel] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showHighlightPopup, setShowHighlightPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // Load highlights from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`highlights-${title}`);
    if (saved) {
      setHighlights(JSON.parse(saved));
    }
  }, [title]);

  // Save highlights to localStorage
  useEffect(() => {
    if (highlights.length > 0) {
      localStorage.setItem(`highlights-${title}`, JSON.stringify(highlights));
    }
  }, [highlights, title]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pageNumber, numPages]);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      
      if (text && text.length > 3) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        // Check if selection is inside PDF content area (not control buttons)
        const pdfContent = document.querySelector('.react-pdf__Page__textContent');
        if (!pdfContent || !range) {
          setShowHighlightPopup(false);
          return;
        }
        
        // Verify selection is within PDF text layer
        const container = range.commonAncestorContainer;
        const isInPdf = pdfContent.contains(container) || pdfContent.contains(container.parentElement);
        
        if (rect && isInPdf) {
          setSelectedText(text);
          setPopupPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 60
          });
          setShowHighlightPopup(true);
        } else {
          setShowHighlightPopup(false);
        }
      } else {
        setShowHighlightPopup(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log('PDF loaded successfully:', numPages, 'pages');
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    
    // Load saved page from localStorage
    const savedPage = localStorage.getItem(`${title}-page`);
    if (savedPage) {
      const page = parseInt(savedPage);
      if (page > 0 && page <= numPages) {
        setPageNumber(page);
      }
    }
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error);
    setIsLoading(false);
    setError(error.message || 'Failed to load PDF');
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setIsPageTransitioning(true);
      setTimeout(() => {
        const newPage = pageNumber - 1;
        setPageNumber(newPage);
        localStorage.setItem(`${title}-page`, newPage.toString());
        setIsPageTransitioning(false);
      }, 150);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setIsPageTransitioning(true);
      setTimeout(() => {
        const newPage = pageNumber + 1;
        setPageNumber(newPage);
        localStorage.setItem(`${title}-page`, newPage.toString());
        setIsPageTransitioning(false);
      }, 150);
    }
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.8));
  };

  const switchTheme = (newTheme: ReaderTheme) => {
    setTheme(newTheme);
    localStorage.setItem('pdf-theme', newTheme.name);
  };

  const addHighlight = (color: string) => {
    if (selectedText && selectedText.length > 0) {
      const selection = window.getSelection();
      let position = undefined;
      
      // Capture position for persistent rendering
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const pdfContainer = document.querySelector('.react-pdf__Page');
        
        if (pdfContainer) {
          const containerRect = pdfContainer.getBoundingClientRect();
          position = {
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left,
            width: rect.width,
            height: rect.height,
          };
        }
      }
      
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        page: pageNumber,
        text: selectedText.substring(0, 200), // Limit to 200 chars
        color,
        timestamp: Date.now(),
        position, // Save position for persistent rendering
      };
      
      const updatedHighlights = [...highlights, newHighlight];
      setHighlights(updatedHighlights);
      
      // Save to localStorage
      localStorage.setItem(`highlights-${title}`, JSON.stringify(updatedHighlights));
      
      setShowHighlightPopup(false);
      setShowCommentPanel(true);
      
      // Clear selection
      window.getSelection()?.removeAllRanges();
      setSelectedText('');
    }
  };

  const addComment = (highlightId: string) => {
    if (newComment.trim()) {
      const updatedHighlights = highlights.map(h => 
        h.id === highlightId ? { ...h, comment: newComment } : h
      );
      setHighlights(updatedHighlights);
      localStorage.setItem(`highlights-${title}`, JSON.stringify(updatedHighlights));
      setNewComment('');
    }
  };

  const deleteHighlight = (id: string) => {
    const updatedHighlights = highlights.filter(h => h.id !== id);
    setHighlights(updatedHighlights);
    localStorage.setItem(`highlights-${title}`, JSON.stringify(updatedHighlights));
  };

  const goToHighlight = (page: number) => {
    setIsPageTransitioning(true);
    setShowCommentPanel(false); // Close panel saat jump
    
    setTimeout(() => {
      setPageNumber(page);
      localStorage.setItem(`${title}-page`, page.toString());
      setIsPageTransitioning(false);
      
      // Scroll to top of page after transition
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }, 150);
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full transition-colors duration-300"
      style={{ backgroundColor: theme.background }}
    >
      {/* Control Bar - Fixed Top */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(44, 95, 93, 0.98) 0%, rgba(44, 95, 93, 0.95) 70%, rgba(44, 95, 93, 0) 100%)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Info Text */}
          <div className="text-center mb-2">
            <p className="text-cream-100 text-sm font-medium">
              📖 {title} • Klik/tap untuk toggle menu
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Page Counter (Info Only) */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
              <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm font-bold text-teal-900">
                Hal. {isLoading ? '...' : `${pageNumber} / ${numPages}`}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
              <span className="text-xs text-teal-700 font-medium mr-1">Zoom:</span>
              <button
                onClick={zoomOut}
                className="w-8 h-8 flex items-center justify-center text-teal-900 hover:bg-teal-100 rounded transition-colors font-bold text-lg"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="text-sm font-bold text-teal-900 w-14 text-center bg-teal-50 rounded px-2 py-1">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="w-8 h-8 flex items-center justify-center text-teal-900 hover:bg-teal-100 rounded transition-colors font-bold text-lg"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {/* Theme Switcher */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
              <span className="text-xs text-teal-700 font-medium mr-1">Tema:</span>
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => switchTheme(t)}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${
                    theme.name === t.name
                      ? 'border-teal-700 scale-110 ring-2 ring-teal-400 shadow-lg'
                      : 'border-gray-300 hover:scale-105 hover:border-teal-500'
                  }`}
                  style={{ backgroundColor: t.background }}
                  aria-label={`${t.name} theme`}
                  title={t.name === 'light' ? 'Terang' : t.name === 'sepia' ? 'Sepia' : 'Gelap'}
                />
              ))}
            </div>

            {/* Highlight Tools */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
              <span className="text-xs text-teal-700 font-medium mr-1">Marking:</span>
              <button
                onClick={() => addHighlight('#FFEB3B')}
                className="w-8 h-8 rounded border-2 border-yellow-400 bg-yellow-300 hover:scale-110 transition-all"
                title="Highlight Kuning"
              />
              <button
                onClick={() => addHighlight('#4CAF50')}
                className="w-8 h-8 rounded border-2 border-green-400 bg-green-300 hover:scale-110 transition-all"
                title="Highlight Hijau"
              />
              <button
                onClick={() => addHighlight('#FF5722')}
                className="w-8 h-8 rounded border-2 border-orange-400 bg-orange-300 hover:scale-110 transition-all"
                title="Highlight Oranye"
              />
              <button
                onClick={() => setShowCommentPanel(!showCommentPanel)}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  showCommentPanel ? 'bg-teal-600 text-white' : 'bg-white text-teal-900 hover:bg-teal-50'
                } border-2 border-teal-400 transition-all`}
                title="Lihat Catatan"
              >
                📝
              </button>
            </div>

            {/* Close Button */}
            <a
              href={`/baca/${url.split('/').pop()?.replace('.pdf', '')}`}
              className="bg-red-600 hover:bg-red-700 backdrop-blur rounded-lg px-4 py-2 shadow-lg text-white transition-colors text-sm font-semibold"
            >
              ✕ Tutup
            </a>
          </div>
        </div>
      </div>

      {/* PDF Content - Scrollable, no padding needed */}
      <div 
        className="absolute inset-0 overflow-auto overscroll-none pt-0"
        onClick={() => setShowControls(!showControls)}
        onContextMenu={(e) => e.preventDefault()}
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Centered single page */}
        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
                  <p className="text-teal-900 font-medium">Memuat {title}...</p>
                </div>
              </div>
            }
            error={
              <div className="flex items-center justify-center py-20">
                <div className="text-center text-red-600 max-w-md px-4">
                  <p className="font-medium mb-2 text-lg">❌ Gagal memuat PDF</p>
                  <p className="text-sm mb-2">{error || 'Unknown error'}</p>
                  <a 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
                  >
                    Buka PDF di tab baru
                  </a>
                </div>
              </div>
            }
          >
            <div 
              className="transition-opacity duration-200 ease-in-out relative"
              style={{ opacity: isPageTransitioning ? 0.3 : 1 }}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                loading={
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700"></div>
                  </div>
                }
                className="shadow-2xl"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
              
              {/* Persistent Highlight Overlays */}
              {highlights
                .filter(h => h.page === pageNumber && h.position)
                .map(h => (
                  <div
                    key={h.id}
                    className="absolute pointer-events-none"
                    style={{
                      top: `${h.position!.top}px`,
                      left: `${h.position!.left}px`,
                      width: `${h.position!.width}px`,
                      height: `${h.position!.height}px`,
                      backgroundColor: h.color,
                      opacity: 0.35,
                      borderRadius: '2px',
                      transition: 'opacity 0.2s',
                    }}
                  />
                ))
              }
            </div>
          </Document>
        </div>
      </div>

      {/* Bottom Navigation Buttons - Fixed */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-teal-900/95 via-teal-900/80 to-transparent backdrop-blur-sm p-4 transition-all duration-300 ${
        showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="flex-1 bg-white/95 backdrop-blur hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed text-teal-900 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Halaman Sebelumnya
          </button>
          
          <div className="bg-white/95 backdrop-blur px-6 py-3 rounded-lg shadow-lg">
            <span className="text-teal-900 font-bold text-lg">
              {pageNumber} / {numPages}
            </span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="flex-1 bg-white/95 backdrop-blur hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed text-teal-900 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Halaman Selanjutnya
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-cream-soft-white/90 z-40 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-700 mx-auto mb-4"></div>
            <p className="text-teal-900 text-lg font-medium">Memuat {title}...</p>
            <p className="text-teal-700 text-sm mt-2">Menyiapkan pengalaman membaca...</p>
          </div>
        </div>
      )}

      {/* Highlight Popup Toolbar (Medium-style) */}
      {showHighlightPopup && (
        <div
          className="fixed z-50 animate-in fade-in zoom-in-95 duration-200"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-teal-900 backdrop-blur-lg rounded-xl shadow-2xl px-3 py-2 flex items-center gap-1.5 border border-teal-700">
            <button
              onClick={() => addHighlight('#FFEB3B')}
              className="group relative w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg hover:scale-110 active:scale-95 transition-all shadow-md hover:shadow-lg border-2 border-yellow-500/30"
              title="Highlight Kuning"
            >
              <div className="absolute inset-0 rounded-lg bg-yellow-400/20 group-hover:bg-transparent transition-colors"></div>
            </button>
            <button
              onClick={() => addHighlight('#4CAF50')}
              className="group relative w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg hover:scale-110 active:scale-95 transition-all shadow-md hover:shadow-lg border-2 border-green-600/30"
              title="Highlight Hijau"
            >
              <div className="absolute inset-0 rounded-lg bg-green-500/20 group-hover:bg-transparent transition-colors"></div>
            </button>
            <button
              onClick={() => addHighlight('#FF5722')}
              className="group relative w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg hover:scale-110 active:scale-95 transition-all shadow-md hover:shadow-lg border-2 border-orange-600/30"
              title="Highlight Orange"
            >
              <div className="absolute inset-0 rounded-lg bg-orange-500/20 group-hover:bg-transparent transition-colors"></div>
            </button>
            <div className="w-px h-8 bg-white/30 mx-1"></div>
            <button
              onClick={() => setShowHighlightPopup(false)}
              className="p-1.5 text-white/60 hover:text-white hover:bg-red-500/20 rounded-lg transition-all"
              title="Tutup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Arrow pointer */}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-teal-900"></div>
        </div>
      )}

      {/* Comment/Highlight Panel */}
      {showCommentPanel && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white/98 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto border-l border-teal-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-teal-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <h3 className="text-sm font-semibold text-teal-900">Catatan & Marking</h3>
              </div>
              <button
                onClick={() => setShowCommentPanel(false)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {highlights.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <p className="text-gray-500 text-sm">
                  Belum ada marking.<br/>
                  <span className="text-xs">Pilih text dan klik warna untuk menandai.</span>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {highlights
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((h) => (
                    <div
                      key={h.id}
                      className="group p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
                      style={{ 
                        borderColor: h.color, 
                        backgroundColor: `${h.color}08`
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full ring-2 ring-offset-1"
                            style={{ 
                              backgroundColor: h.color,
                              '--tw-ring-color': h.color
                            } as React.CSSProperties}
                          />
                          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
                            Halaman {h.page}
                          </span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => goToHighlight(h.page)}
                            className="p-1.5 hover:bg-teal-100 rounded-lg transition-colors"
                            title="Ke halaman ini"
                          >
                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteHighlight(h.id)}
                            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed italic border-l-2 pl-3" style={{ borderColor: h.color }}>
                        "{h.text}"
                      </p>
                      
                      {h.comment ? (
                        <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                          <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <p className="text-xs text-gray-600 flex-1">{h.comment}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="💭 Tambah komentar..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') addComment(h.id);
                            }}
                            className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
