import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function Page() {
  const user = await getSession();
  if (user) {
    // Server-side redirect to admin dashboard if already authenticated
    redirect('/admin');
  }

  return <LoginForm />;
}
