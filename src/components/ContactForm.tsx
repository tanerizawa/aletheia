'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nama wajib diisi';
        if (value.trim().length < 3) return 'Nama minimal 3 karakter';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email wajib diisi';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Format email tidak valid';
        return '';
      
      case 'subject':
        if (!value.trim()) return 'Subjek wajib diisi';
        if (value.trim().length < 5) return 'Subjek minimal 5 karakter';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Pesan wajib diisi';
        if (value.trim().length < 10) return 'Pesan minimal 10 karakter';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      if (onError) onError('Mohon perbaiki kesalahan pada form');
      return;
    }

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan');
      }
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      
      if (onSuccess) onSuccess(data.message || 'Pesan berhasil dikirim!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.';
      if (onError) onError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-serif font-bold text-[#1F4E4C] mb-2">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 bg-white text-gray-800 rounded transition-all ${
              errors.name && touched.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[#C4BDB2] focus:border-[#B05E3F] focus:ring-[#B05E3F]'
            } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
            placeholder="Masukkan nama Anda"
            aria-required="true"
            aria-invalid={errors.name && touched.name ? 'true' : 'false'}
            aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
          />
          {!errors.name && touched.name && formData.name && (
            <div className="absolute right-3 top-3.5">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {errors.name && touched.name && (
          <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-serif font-bold text-[#1F4E4C] mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 bg-white text-gray-800 rounded transition-all ${
              errors.email && touched.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[#C4BDB2] focus:border-[#B05E3F] focus:ring-[#B05E3F]'
            } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
            placeholder="nama@email.com"
            aria-required="true"
            aria-invalid={errors.email && touched.email ? 'true' : 'false'}
            aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
          />
          {!errors.email && touched.email && formData.email && (
            <div className="absolute right-3 top-3.5">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {errors.email && touched.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-serif font-bold text-[#1F4E4C] mb-2">
          Subjek <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border-2 bg-white text-gray-800 rounded transition-all ${
              errors.subject && touched.subject
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[#C4BDB2] focus:border-[#B05E3F] focus:ring-[#B05E3F]'
            } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
            placeholder="Subjek pesan"
            aria-required="true"
            aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
            aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
          />
          {!errors.subject && touched.subject && formData.subject && (
            <div className="absolute right-3 top-3.5">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {errors.subject && touched.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-serif font-bold text-[#1F4E4C] mb-2">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border-2 bg-white text-gray-800 rounded resize-none transition-all ${
            errors.message && touched.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-[#C4BDB2] focus:border-[#B05E3F] focus:ring-[#B05E3F]'
          } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
          placeholder="Tulis pesan Anda di sini"
          aria-required="true"
          aria-invalid={errors.message && touched.message ? 'true' : 'false'}
          aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
        />
        {errors.message && touched.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#B05E3F] text-[#FAF8F5] px-8 py-4 font-serif font-bold text-lg hover:bg-[#9A5035] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#B05E3F] hover:border-[#9A5035] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        aria-label="Kirim pesan kontak"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Mengirim...</span>
          </>
        ) : (
          'Kirim Pesan'
        )}
      </button>
    </form>
  );
}
