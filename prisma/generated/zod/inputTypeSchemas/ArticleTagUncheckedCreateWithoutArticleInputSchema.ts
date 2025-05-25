import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const ArticleTagUncheckedCreateWithoutArticleInputSchema: z.ZodType<Prisma.ArticleTagUncheckedCreateWithoutArticleInput> = z.object({
  id: z.number().int().optional(),
  tagId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ArticleTagUncheckedCreateWithoutArticleInputSchema;
