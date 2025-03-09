import 'server-only';
import { getSession } from '@/app/_fetchers/sessions.fetcher';
import { redirect } from 'next/navigation';

export async function authorizedRoute() {
  let isAuthorized = false;

  try {
    const session = await getSession();
    isAuthorized = !!session;
  } catch {
    isAuthorized = false;
  }

  if (!isAuthorized) {
    redirect('/sign-in');
  }
}
