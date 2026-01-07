export type Researcher = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
};

export const researchers: Researcher[] = [
  {
    id: 'odang',
    name: 'Odang',
    role: 'Kepala Lembaga',
    bio: 'Kepala lembaga PT Academos Pustaka Demokrasi, fokus pada pengembangan literasi komunitas dan strategi publikasi.',
    email: 'studiomalaka@gmail.com'
  },
  {
    id: 'dr-wardhana',
    name: 'Dr. Wardhana',
    role: 'Peneliti Utama',
    bio: 'Peneliti sosial dengan minat pada psikologi masyarakat dan sejarah lokal.'
  }
];

export default researchers;
