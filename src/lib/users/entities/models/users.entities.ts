import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().max(50),
  identityId: z.number(),
  id: z.number(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.pick({
  username: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;
