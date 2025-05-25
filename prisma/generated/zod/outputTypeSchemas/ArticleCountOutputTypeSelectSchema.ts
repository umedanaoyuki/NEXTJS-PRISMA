import { z } from 'zod';
import type { Prisma } from '../../../../app/generated/prisma';

export const ArticleCountOutputTypeSelectSchema: z.ZodType<Prisma.ArticleCountOutputTypeSelect> = z.object({
  ArticleTag: z.boolean().optional(),
}).strict();

export default ArticleCountOutputTypeSelectSchema;
