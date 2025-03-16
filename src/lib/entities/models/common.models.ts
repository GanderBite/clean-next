import { z } from 'zod';

export const idModel = z.number().positive();

export type Id = number;
