import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default UserCreateInputSchema;
