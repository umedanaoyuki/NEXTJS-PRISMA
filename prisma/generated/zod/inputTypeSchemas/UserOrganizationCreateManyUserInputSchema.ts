import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';

export const UserOrganizationCreateManyUserInputSchema: z.ZodType<Prisma.UserOrganizationCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  organizationId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default UserOrganizationCreateManyUserInputSchema;
