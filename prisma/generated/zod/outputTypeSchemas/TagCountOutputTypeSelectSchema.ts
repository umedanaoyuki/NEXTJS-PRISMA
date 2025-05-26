import { z } from 'zod';
import type { Prisma } from '../../../../app/generated/prisma';

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  articleTags: z.boolean().optional(),
}).strict();

export default TagCountOutputTypeSelectSchema;
