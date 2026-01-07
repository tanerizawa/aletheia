'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (value: string): string => {
    if (!value.trim()) return 'Email wajib diisi';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format email tidak valid';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched) {
      const validationError = validateEmail(value);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      setTouched(true);
      return;
    }

    setStatus('loading');
    
    try {
      const res = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'Terjadi kesalahan');
        setTimeout(() => {
          setStatus('idle');
          setError('');
        }, 3000);
        return;
      }

      setStatus('success');
      setEmail('');
      setTouched(false);
      setError('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setError('Gagal menghubungi server');
      setTimeout(() => {
        setStatus('idle');
        setError('');
      }, 3000);
    }
  };

  const isValid = !error && email.trim().length > 0;

  return (
    <section className="bg-[#2C5F5D] py-16" aria-labelledby="newsletter-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="newsletter-heading" className="font-serif text-3xl lg:text-4xl font-bold text-cream-soft-white mb-4">
            Berlangganan Newsletter
          </h2>
          <p className="text-cream-warm mb-8 text-lg">
            Dapatkan informasi terbaru tentang kegiatan, buku baru, dan event spesial kami
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Masukkan email Anda"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full px-6 py-4 rounded border-2 bg-white text-gray-800 transition-all ${
                    error && touched
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-cream-soft-white focus:border-[#B05E3F] focus:ring-[#B05E3F]'
                  } focus:outline-none focus:ring-2 disabled:opacity-50`}
                  aria-label="Email untuk newsletter"
                  aria-invalid={error && touched ? 'true' : 'false'}
                  aria-describedby={error && touched ? 'email-error' : undefined}
                  autoComplete="email"
                />
                {isValid && touched && (
                  <div className="absolute right-3 top-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success' || (touched && !!error)}
                className="px-8 py-4 bg-[#B05E3F] text-cream-soft-white font-semibold rounded hover:bg-[#9A5035] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#B05E3F] hover:border-[#9A5035] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-[160px]"
                aria-label="Kirim pendaftaran newsletter"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Mengirim...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Berhasil!</span>
                  </>
                ) : (
                  'Berlangganan'
                )}
              </button>
            </div>
            
            {error && touched && (
              <p id="email-error" className="text-sm text-red-200 flex items-center gap-1 -mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {error}
              </p>
            )}
          </form>
          
          {status === 'success' && (
            <p className="mt-4 text-cream-soft-white bg-[#1F4E4C] px-6 py-3 rounded inline-block animate-fadeIn" role="status">
              Terima kasih! Anda telah berlangganan newsletter kami.
            </p>
          )}
          
          <p className="mt-6 text-sm text-cream-beige">
            Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
