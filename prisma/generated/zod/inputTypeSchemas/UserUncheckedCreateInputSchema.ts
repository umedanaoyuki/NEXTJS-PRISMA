import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleUncheckedCreateNestedManyWithoutUserInputSchema } from './ArticleUncheckedCreateNestedManyWithoutUserInputSchema';
import { UserOrganizationUncheckedCreateNestedManyWithoutUserInputSchema } from './UserOrganizationUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userOrganizations: z.lazy(() => UserOrganizationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateInputSchema;
