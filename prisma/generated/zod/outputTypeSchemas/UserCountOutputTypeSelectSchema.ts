import { z } from 'zod';
import type { Prisma } from '../../../../app/generated/prisma';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  articles: z.boolean().optional(),
  userOrganizations: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
