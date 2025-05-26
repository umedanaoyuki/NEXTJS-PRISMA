import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleCreateNestedManyWithoutUserInputSchema } from './ArticleCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutUserOrganizationsInputSchema: z.ZodType<Prisma.UserCreateWithoutUserOrganizationsInput> = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutUserOrganizationsInputSchema;
