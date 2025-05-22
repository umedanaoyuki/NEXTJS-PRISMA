import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default UserUncheckedCreateInputSchema;
