import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { UserCreateNestedOneWithoutArticlesInputSchema } from './UserCreateNestedOneWithoutArticlesInputSchema';

export const ArticleCreateWithoutArticleTagInputSchema: z.ZodType<Prisma.ArticleCreateWithoutArticleTagInput> = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema)
}).strict();

export default ArticleCreateWithoutArticleTagInputSchema;
