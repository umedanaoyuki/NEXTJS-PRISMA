import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TagAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TagAvgOrderByAggregateInputSchema;
