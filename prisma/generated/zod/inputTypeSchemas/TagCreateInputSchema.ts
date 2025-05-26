import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { ArticleTagCreateNestedManyWithoutTagInputSchema } from './ArticleTagCreateNestedManyWithoutTagInputSchema';

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  articleTags: z.lazy(() => ArticleTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export default TagCreateInputSchema;
