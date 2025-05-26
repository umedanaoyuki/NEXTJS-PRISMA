import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleCreateNestedManyWithoutUserInputSchema } from './ArticleCreateNestedManyWithoutUserInputSchema';
import { UserOrganizationCreateNestedManyWithoutUserInputSchema } from './UserOrganizationCreateNestedManyWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutUserInputSchema).optional(),
  userOrganizations: z.lazy(() => UserOrganizationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateInputSchema;
