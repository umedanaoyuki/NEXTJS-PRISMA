import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const ArticleTagCreateManyArticleInputSchema: z.ZodType<Prisma.ArticleTagCreateManyArticleInput> = z.object({
  id: z.number().int().optional(),
  tagId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ArticleTagCreateManyArticleInputSchema;
