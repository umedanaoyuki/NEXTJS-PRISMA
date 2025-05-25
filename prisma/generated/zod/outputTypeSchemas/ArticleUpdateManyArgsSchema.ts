import { z } from 'zod';
import type { Prisma } from '../../../../app/generated/prisma';
import { ArticleUpdateManyMutationInputSchema } from '../inputTypeSchemas/ArticleUpdateManyMutationInputSchema'
import { ArticleUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ArticleUncheckedUpdateManyInputSchema'
import { ArticleWhereInputSchema } from '../inputTypeSchemas/ArticleWhereInputSchema'

export const ArticleUpdateManyArgsSchema: z.ZodType<Prisma.ArticleUpdateManyArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ArticleUpdateManyArgsSchema;
