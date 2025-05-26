import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { OrganizationCreateNestedOneWithoutUserOrganizationsInputSchema } from './OrganizationCreateNestedOneWithoutUserOrganizationsInputSchema';

export const UserOrganizationCreateWithoutUserInputSchema: z.ZodType<Prisma.UserOrganizationCreateWithoutUserInput> = z.object({
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutUserOrganizationsInputSchema)
}).strict();

export default UserOrganizationCreateWithoutUserInputSchema;
