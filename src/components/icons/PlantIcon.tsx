export default function PlantIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 22v-7m0 0c-1.5 0-2.5-.5-3.5-1.5S7 11 7 9.5C7 7 9 5 11.5 5S16 7 16 9.5c0 1.5-.5 2.5-1.5 3.5S13.5 15 12 15zm0-13c2.5 0 4.5 2 4.5 4.5 0 1.5-.5 2.5-1.5 3.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2v3m0 10c1.5 0 2.5-.5 3.5-1.5S17 11 17 9.5C17 7 15 5 12.5 5"
      />
    </svg>
  );
}
