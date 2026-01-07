import { redirect } from 'next/navigation';

export default function ReaderIndexPage() {
  // Redirect to ebook library if someone accesses /reader directly
  redirect('/baca');
}
