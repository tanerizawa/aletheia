'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="bg-[#2C5F5D] py-16" aria-labelledby="newsletter-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="newsletter-heading" className="font-serif text-3xl lg:text-4xl font-bold text-[#F5F1E8] mb-4">
            Berlangganan Newsletter
          </h2>
          <p className="text-[#E8DED0] mb-8 text-lg">
            Dapatkan informasi terbaru tentang kegiatan, buku baru, dan event spesial kami
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-6 py-4 rounded border-2 border-[#F5F1E8] bg-white text-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#B05E3F] focus:border-[#B05E3F] disabled:opacity-50 transition-all"
              aria-label="Email untuk newsletter"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-8 py-4 bg-[#B05E3F] text-[#F5F1E8] font-semibold rounded hover:bg-[#9A5035] transition-all border-2 border-[#B05E3F] hover:border-[#9A5035] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              aria-label="Kirim pendaftaran newsletter"
            >
              {status === 'loading' ? 'Mengirim...' : status === 'success' ? 'Berhasil! ✓' : 'Berlangganan'}
            </button>
          </form>
          
          {status === 'success' && (
            <p className="mt-4 text-[#F5F1E8] bg-[#1F4E4C] px-6 py-3 rounded inline-block animate-fadeIn" role="status">
              Terima kasih! Anda telah berlangganan newsletter kami.
            </p>
          )}
          
          <p className="mt-6 text-sm text-[#D4C4B0]">
            Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
