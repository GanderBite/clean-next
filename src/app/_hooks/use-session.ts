import 'server-only';
import { getUserByIdentityId } from '@/app/_fetchers/users.fetcher';
import { getSession } from '@/app/_fetchers/sessions.fetcher';
import { redirect } from 'next/navigation';

export async function session() {
  try {
    const currSession = await getSession();

    const user = await getUserByIdentityId(currSession.identityId);

    return {
      currSession,
      user,
    };
  } catch {
    redirect('/sign-in');
  }
}
