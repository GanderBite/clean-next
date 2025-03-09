import { z } from 'zod';

export const identitySchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(1),
  id: z.number().positive(),
});

export type Identity = z.infer<typeof identitySchema>;

export const createIdentitySchema = identitySchema.pick({
  password: true,
  email: true,
});

export type CreateIdentity = z.output<typeof createIdentitySchema>;
