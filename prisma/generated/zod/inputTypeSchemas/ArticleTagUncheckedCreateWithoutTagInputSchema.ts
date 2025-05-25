import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const ArticleTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.ArticleTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.number().int().optional(),
  articleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ArticleTagUncheckedCreateWithoutTagInputSchema;
