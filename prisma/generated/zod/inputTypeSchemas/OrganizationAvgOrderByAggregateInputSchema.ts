import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const OrganizationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default OrganizationAvgOrderByAggregateInputSchema;
