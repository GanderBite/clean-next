import { session } from '@/app/_hooks/use-session';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { currSession } = await session();

  if (currSession) {
    redirect('/dashboard');
  } else {
    redirect('/sign-in');
  }
}
