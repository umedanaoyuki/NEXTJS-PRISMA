import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { UserOrganizationCreateNestedManyWithoutOrganizationInputSchema } from './UserOrganizationCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationCreateInputSchema: z.ZodType<Prisma.OrganizationCreateInput> = z.object({
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userOrganizations: z.lazy(() => UserOrganizationCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationCreateInputSchema;
