import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ArticleListRelationFilterSchema } from './ArticleListRelationFilterSchema';
import { UserOrganizationListRelationFilterSchema } from './UserOrganizationListRelationFilterSchema';

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string().min(1),
    email: z.string().email().min(1)
  }),
  z.object({
    id: z.number().int(),
    username: z.string().min(1),
  }),
  z.object({
    id: z.number().int(),
    email: z.string().email().min(1),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string().min(1),
    email: z.string().email().min(1),
  }),
  z.object({
    username: z.string().min(1),
  }),
  z.object({
    email: z.string().email().min(1),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().min(1).optional(),
  email: z.string().email().min(1).optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional(),
  userOrganizations: z.lazy(() => UserOrganizationListRelationFilterSchema).optional()
}).strict());

export default UserWhereUniqueInputSchema;
