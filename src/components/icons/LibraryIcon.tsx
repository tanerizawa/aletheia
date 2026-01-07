interface IconProps {
  className?: string;
}

export default function LibraryIcon({ className = "w-16 h-16" }: IconProps) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Classical library/museum building with pillars */}
      <path d="M3 21h18M4 18h16M4 18V9M20 18V9" />
      <path d="M2 9l10-7 10 7" />
      <path d="M6 18V9M10 18V9M14 18V9M18 18V9" />
      <rect x="8" y="16" width="8" height="2" fill="currentColor" />
    </svg>
  );
}
