import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ArticleTagOrderByRelationAggregateInputSchema } from './ArticleTagOrderByRelationAggregateInputSchema';

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  articleTags: z.lazy(() => ArticleTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export default TagOrderByWithRelationInputSchema;
