import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleCreateNestedOneWithoutArticleTagInputSchema } from './ArticleCreateNestedOneWithoutArticleTagInputSchema';

export const ArticleTagCreateWithoutTagInputSchema: z.ZodType<Prisma.ArticleTagCreateWithoutTagInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  article: z.lazy(() => ArticleCreateNestedOneWithoutArticleTagInputSchema)
}).strict();

export default ArticleTagCreateWithoutTagInputSchema;
