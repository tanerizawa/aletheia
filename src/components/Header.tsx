'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/data/navigation';
import NavIcon from '@/components/NavIcon';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-teal-700 border-b-4 border-terra-700 sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Navigasi utama">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="group hover:opacity-90 transition-opacity" aria-label="Rumah Aletheia - Kembali ke beranda">
              <Image src="/logo.svg" alt="Rumah Aletheia - part of Academos" width={240} height={80} className="h-14 lg:h-16 w-auto" priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" role="navigation">
            {mainNavigation.map((item) => (
              <div key={item.title} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="px-5 py-2 text-cream-100 hover:text-terra-400 hover:bg-teal-800 rounded transition-all font-medium flex items-center space-x-1"
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
                    <div className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-terra-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
                      {item.description && (
                        <div className="px-4 py-3 border-b border-cream-400 bg-cream-50">
                          <p className="text-sm font-semibold text-teal-700">{item.description}</p>
                        </div>
                      )}
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start px-4 py-3 hover:bg-cream-50 transition-colors group/item"
                          >
                            <div className="mr-3 mt-0.5 text-terra-700">
                              {child.icon && <NavIcon icon={child.icon} className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-teal-800 group-hover/item:text-terra-700 transition-colors">
                                {child.title}
                              </div>
                              {child.description && (
                                <div className="text-xs text-secondary mt-0.5">
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
                    className={`px-5 py-2 rounded transition-all font-medium ${
                      isActive(item.href)
                        ? 'bg-terra-700 text-cream-50 hover:bg-terra-600 hover:text-white'
                        : 'text-cream-100 hover:text-terra-400 hover:bg-teal-800'
                    }`}
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
              className="text-cream-100 hover:text-terra-400 focus:outline-none focus:ring-2 focus:ring-terra-700 focus:ring-offset-2 focus:ring-offset-teal-700 rounded p-2"
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
          <div className="md:hidden pb-6 pt-2 space-y-1 border-t border-teal-800 mt-2" id="mobile-menu" role="navigation" aria-label="Navigasi mobile">
            {mainNavigation.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className="w-full text-left py-3 px-4 text-cream-100 hover:bg-teal-800 hover:text-terra-400 rounded transition-all font-medium flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        {item.icon && <NavIcon icon={item.icon} className="w-5 h-5" />}
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
                            className="flex items-center gap-2 py-2 px-4 text-cream-100 hover:bg-teal-800 hover:text-terra-400 rounded transition-all text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.icon && <NavIcon icon={child.icon} className="w-4 h-4" />}
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 py-3 px-4 text-cream-100 hover:bg-teal-800 hover:text-terra-400 rounded transition-all font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <NavIcon icon={item.icon} className="w-5 h-5" />}
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
