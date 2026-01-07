export type Program = {
  id: string;
  title: string;
  duration: string;
  level: string;
  summary: string;
  contact?: string;
};

export const programs: Program[] = [
  {
    id: 'literasi-digital',
    title: 'Literasi Digital',
    duration: '4 minggu',
    level: 'Dasar',
    summary: 'Pengantar literasi digital: mencari, mengevaluasi, dan menggunakan informasi secara aman.',
    contact: 'studiomalaka@gmail.com',
  },
  {
    id: 'menulis-kreatif',
    title: 'Keterampilan Menulis',
    duration: '6 minggu',
    level: 'Menengah',
    summary: 'Workshop menulis kreatif untuk penguatan gaya dan struktur narasi.'
  }
];

export default programs;
