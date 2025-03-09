import { z } from 'zod';

export const createSessionInput = z.object({
  identityId: z.number(),
});

export type CreateSessionInput = z.input<typeof createSessionInput>;
