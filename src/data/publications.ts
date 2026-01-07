export type Publication = {
  id: string;
  title: string;
  author: string;
  year?: number;
  price?: number;
  description?: string;
};

export const publications: Publication[] = [
  {
    id: 'contoh-buku-1',
    title: 'Pengantar Literasi Komunitas',
    author: 'Tim Academos',
    year: 2025,
    price: 0,
    description: 'Kumpulan panduan praktis untuk membangun perpustakaan komunitas.'
  }
];

export default publications;
