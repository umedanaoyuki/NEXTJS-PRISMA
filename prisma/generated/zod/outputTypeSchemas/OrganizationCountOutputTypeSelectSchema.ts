import { z } from 'zod';
import type { Prisma } from '../../../../app/generated/prisma';

export const OrganizationCountOutputTypeSelectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = z.object({
  userOrganizations: z.boolean().optional(),
}).strict();

export default OrganizationCountOutputTypeSelectSchema;
