import { verifySessionController } from '@/lib/auth/infrastructure/controllers/verify-session.controller';
import { signOutController } from '@/lib/auth/infrastructure/controllers/sign-out.controller';
import { signUpController } from '@/lib/auth/infrastructure/controllers/sign-up.controller';
import { signInController } from '@/lib/auth/infrastructure/controllers/sign-in.controller';

const auth = {
  sessions: {
    verifySession: verifySessionController,
  },
  signOut: signOutController,
  signUp: signUpController,
  signIn: signInController,
};

export { auth };
