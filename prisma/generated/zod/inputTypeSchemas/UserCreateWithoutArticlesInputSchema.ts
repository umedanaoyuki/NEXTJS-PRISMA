import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { UserOrganizationCreateNestedManyWithoutUserInputSchema } from './UserOrganizationCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateWithoutArticlesInput> = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userOrganizations: z.lazy(() => UserOrganizationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutArticlesInputSchema;
