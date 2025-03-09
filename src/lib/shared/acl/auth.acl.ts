import { auth } from '@/lib/auth';

export const authAcl = (() => {
  return {
    async verifySession(token: undefined | string) {
      await auth.sessions.verifySession(token);
    },
  };
})();
