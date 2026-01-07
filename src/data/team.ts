export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
};

export const team: TeamMember[] = [
  {
    id: 'odang',
    name: 'Odang',
    role: 'Kepala Lembaga',
    bio: 'Memimpin PT Academos dan inisiatif Rumah Aletheia.'
  },
  {
    id: 'librarian-1',
    name: 'Siti',
    role: 'Kepala Perpustakaan',
    bio: 'Bertanggung jawab atas koleksi dan layanan perpustakaan.'
  }
];

export default team;
