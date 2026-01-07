'use client';

import dynamic from 'next/dynamic';

const PdfReader = dynamic(() => import('./PdfReader'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-cream-soft-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat PDF Reader...</p>
      </div>
    </div>
  ),
});

interface ReaderWrapperProps {
  url: string;
  title: string;
}

export default function ReaderWrapper({ url, title }: ReaderWrapperProps) {
  return <PdfReader url={url} title={title} />;
}
