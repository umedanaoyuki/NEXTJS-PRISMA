import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string().min(1, {message: "1文字以上入力してください"}).max(30, {message: "30文字以内で入力してください"}),
  email: z.string().email().min(1, {message: "1文字以上入力してください"}).max(255, {message: "255文字以内で入力してください"}),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default UserCreateInputSchema;
