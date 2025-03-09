import { z } from 'zod';

export const sessionSchema = z.object({
  identityId: z.number(),
  expiresAt: z.date(),
  token: z.string(),
  id: z.number(),
});

export type Session = z.infer<typeof sessionSchema>;

export const createSessionSchema = sessionSchema.pick({
  identityId: true,
  expiresAt: true,
  token: true,
});

export type CreateSession = z.infer<typeof createSessionSchema>;
