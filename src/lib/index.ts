import { getLoggedInUserController } from './infrastructure-adapters/controllers/auth/get-logged-in-user.controller';
import { signInController } from './infrastructure-adapters/controllers/auth/sign-in.controller';

export const api = {
  auth: {
    getLoggedInUser: getLoggedInUserController(),
    signIn: signInController,
  },
};
