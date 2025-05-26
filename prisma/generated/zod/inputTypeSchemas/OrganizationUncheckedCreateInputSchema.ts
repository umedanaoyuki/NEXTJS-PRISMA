import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputSchema } from './UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationUncheckedCreateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userOrganizations: z.lazy(() => UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationUncheckedCreateInputSchema;
