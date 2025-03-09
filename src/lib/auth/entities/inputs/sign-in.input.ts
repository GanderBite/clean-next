import { z } from 'zod';

export const signInInput = z.object({
  password: z.string(),
  email: z.string(),
});

export type SignInInput = z.input<typeof signInInput>;
