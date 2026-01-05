'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mainNavigation } from '@/data/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <header className="bg-[#2C5F5D] border-b-4 border-[#B05E3F] sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Navigasi utama">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="group flex items-center space-x-3 hover:opacity-90 transition-opacity" aria-label="Rumah Aletheia - Kembali ke beranda">
              <div className="text-4xl">🏛️</div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#F5F1E8] tracking-tight">
                  Rumah Aletheia
                </span>
                <span className="text-xs text-[#E8DED0] tracking-wide">
                  part of Academos
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" role="navigation">
            {mainNavigation.map((item) => (
              <div key={item.title} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="px-5 py-2 text-[#F5F1E8] hover:text-[#B05E3F] hover:bg-[#1F4E4C] rounded transition-all font-medium flex items-center space-x-1"
                      onClick={() => toggleDropdown(item.title)}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.title}
                    >
                      <span>{item.title}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-[#B05E3F] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
                      {item.description && (
                        <div className="px-4 py-3 border-b border-[#E8DED0] bg-[#F5F1E8]">
                          <p className="text-sm font-semibold text-[#2C5F5D]">{item.description}</p>
                        </div>
                      )}
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start px-4 py-3 hover:bg-[#F5F1E8] transition-colors group/item"
                          >
                            <span className="text-xl mr-3 mt-0.5">{child.icon}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-[#2C5F5D] group-hover/item:text-[#B05E3F] transition-colors">
                                {child.title}
                              </div>
                              {child.description && (
                                <div className="text-xs text-[#5A5A5A] mt-0.5">
                                  {child.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-5 py-2 text-[#F5F1E8] hover:text-[#B05E3F] hover:bg-[#1F4E4C] rounded transition-all font-medium"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#F5F1E8] hover:text-[#B05E3F] focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:ring-offset-2 focus:ring-offset-[#2C5F5D] rounded p-2"
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 pt-2 space-y-1 border-t border-[#1F4E4C] mt-2" id="mobile-menu" role="navigation" aria-label="Navigasi mobile">
            {mainNavigation.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className="w-full text-left py-3 px-4 text-[#F5F1E8] hover:bg-[#1F4E4C] hover:text-[#B05E3F] rounded transition-all font-medium flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.title && (
                      <div className="pl-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 px-4 text-[#E8DED0] hover:bg-[#1F4E4C] hover:text-[#B05E3F] rounded transition-all text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="mr-2">{child.icon}</span>
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 py-3 px-4 text-[#F5F1E8] hover:bg-[#1F4E4C] hover:text-[#B05E3F] rounded transition-all font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
