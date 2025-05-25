import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';

export const ArticleScalarRelationFilterSchema: z.ZodType<Prisma.ArticleScalarRelationFilter> = z.object({
  is: z.lazy(() => ArticleWhereInputSchema).optional(),
  isNot: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export default ArticleScalarRelationFilterSchema;
