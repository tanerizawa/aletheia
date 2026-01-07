export function formatDate(value?: string | Date | null, locale = 'id-ID', options?: Intl.DateTimeFormatOptions) {
  if (!value) return '—';
  const d = new Date(value as string | number | Date);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(locale, options);
}

export function isAfterNow(value?: string | Date | null) {
  if (!value) return false;
  const d = new Date(value as string | number | Date);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() > Date.now();
}

export function isBeforeNow(value?: string | Date | null) {
  if (!value) return false;
  const d = new Date(value as string | number | Date);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}
