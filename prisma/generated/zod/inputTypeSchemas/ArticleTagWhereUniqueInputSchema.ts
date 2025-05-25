import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleTagWhereInputSchema } from './ArticleTagWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ArticleScalarRelationFilterSchema } from './ArticleScalarRelationFilterSchema';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';
import { TagScalarRelationFilterSchema } from './TagScalarRelationFilterSchema';
import { TagWhereInputSchema } from './TagWhereInputSchema';

export const ArticleTagWhereUniqueInputSchema: z.ZodType<Prisma.ArticleTagWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ArticleTagWhereInputSchema),z.lazy(() => ArticleTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleTagWhereInputSchema),z.lazy(() => ArticleTagWhereInputSchema).array() ]).optional(),
  articleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  article: z.union([ z.lazy(() => ArticleScalarRelationFilterSchema),z.lazy(() => ArticleWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export default ArticleTagWhereUniqueInputSchema;
