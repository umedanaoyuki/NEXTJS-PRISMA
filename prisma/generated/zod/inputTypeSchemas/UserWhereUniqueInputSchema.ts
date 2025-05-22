import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string().min(1, {message: "1文字以上入力してください"}).max(30, {message: "30文字以内で入力してください"}),
    email: z.string().email().min(1, {message: "1文字以上入力してください"}).max(255, {message: "255文字以内で入力してください"})
  }),
  z.object({
    id: z.number().int(),
    username: z.string().min(1, {message: "1文字以上入力してください"}).max(30, {message: "30文字以内で入力してください"}),
  }),
  z.object({
    id: z.number().int(),
    email: z.string().email().min(1, {message: "1文字以上入力してください"}).max(255, {message: "255文字以内で入力してください"}),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string().min(1, {message: "1文字以上入力してください"}).max(30, {message: "30文字以内で入力してください"}),
    email: z.string().email().min(1, {message: "1文字以上入力してください"}).max(255, {message: "255文字以内で入力してください"}),
  }),
  z.object({
    username: z.string().min(1, {message: "1文字以上入力してください"}).max(30, {message: "30文字以内で入力してください"}),
  }),
  z.object({
    email: z.string().email().min(1, {message: "1文字以上入力してください"}).max(255, {message: "255文字以内で入力してください"}),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().min(1, {message: "1文字以上入力してください"}).max(30, {message: "30文字以内で入力してください"}).optional(),
  email: z.string().email().min(1, {message: "1文字以上入力してください"}).max(255, {message: "255文字以内で入力してください"}).optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export default UserWhereUniqueInputSchema;
