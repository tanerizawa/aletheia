export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  description?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: '2024-foundation',
    date: '2024-10-01',
    title: 'PT Academos Pustaka Demokrasi didirikan',
    description: 'SK Pendirian AHU-038489.AH.01.30.Tahun 2024.'
  },
  {
    id: '2025-aletheia',
    date: '2025-01-01',
    title: 'Rumah Aletheia diluncurkan',
    description: 'Perpustakaan komunitas Rumah Aletheia resmi beroperasi.'
  }
];

export default timeline;
