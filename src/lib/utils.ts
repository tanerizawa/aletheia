import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Get room name from path
 */
export function getRoomFromPath(pathname: string): string {
  const roomMap: Record<string, string> = {
    "/": "Halaman Depan",
    "/tentang": "Ruang Tamu",
    "/kegiatan": "Taman",
    "/koleksi": "Galeri Koleksi",
    "/baca": "Ruang Baca",
    "/belajar": "Ruang Belajar",
    "/penelitian": "Studio Riset",
    "/penerbitan": "Toko Buku",
    "/kontak": "Resepsionis",
  };

  // Check for exact match first
  if (roomMap[pathname]) return roomMap[pathname];

  // Check for sub-routes
  for (const [path, room] of Object.entries(roomMap)) {
    if (pathname.startsWith(path) && path !== "/") {
      return room;
    }
  }

  return "Rumah Aletheia";
}

/**
 * Get room icon from path
 */
export function getRoomIcon(pathname: string): string {
  const iconMap: Record<string, string> = {
    "/": "🏛️",
    "/tentang": "🛋️",
    "/kegiatan": "🌳",
    "/koleksi": "📚",
    "/baca": "📖",
    "/belajar": "💡",
    "/penelitian": "🔬",
    "/penerbitan": "📕",
    "/kontak": "📞",
  };

  for (const [path, icon] of Object.entries(iconMap)) {
    if (pathname.startsWith(path) && path !== "/") {
      return icon;
    }
  }

  return iconMap[pathname] || "🏛️";
}

/**
 * Check if path is active
 */
export function isActivePath(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}
