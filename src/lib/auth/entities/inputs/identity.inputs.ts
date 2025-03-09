import type { z } from 'zod';

import { createIdentitySchema } from '@/lib/auth/entities/models/identity.entity';

export const createIdentityInputSchema = createIdentitySchema;

export type CreateIdentityInput = z.infer<typeof createIdentityInputSchema>;
