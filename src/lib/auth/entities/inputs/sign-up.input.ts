import { z } from 'zod';

export const signUpInput = z
  .object({
    email: z.string().min(1).max(255).email(),
    username: z.string().min(1).max(50),
    confirmPassword: z.string().min(1),
    password: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['password'],
  });

export type SignUpInput = z.input<typeof signUpInput>;
