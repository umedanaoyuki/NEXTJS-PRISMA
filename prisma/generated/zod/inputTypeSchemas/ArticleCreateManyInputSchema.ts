import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const ArticleCreateManyInputSchema: z.ZodType<Prisma.ArticleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ArticleCreateManyInputSchema;
