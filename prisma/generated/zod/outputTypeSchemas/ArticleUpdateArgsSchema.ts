import { z } from 'zod';
import type { Prisma } from '../../../../app/generated/prisma';
import { ArticleIncludeSchema } from '../inputTypeSchemas/ArticleIncludeSchema'
import { ArticleUpdateInputSchema } from '../inputTypeSchemas/ArticleUpdateInputSchema'
import { ArticleUncheckedUpdateInputSchema } from '../inputTypeSchemas/ArticleUncheckedUpdateInputSchema'
import { ArticleWhereUniqueInputSchema } from '../inputTypeSchemas/ArticleWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ArticleTagFindManyArgsSchema } from "../outputTypeSchemas/ArticleTagFindManyArgsSchema"
import { ArticleCountOutputTypeArgsSchema } from "../outputTypeSchemas/ArticleCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArticleSelectSchema: z.ZodType<Prisma.ArticleSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  ArticleTag: z.union([z.boolean(),z.lazy(() => ArticleTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArticleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ArticleUpdateArgsSchema: z.ZodType<Prisma.ArticleUpdateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: z.lazy(() => ArticleIncludeSchema).optional(),
  data: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export default ArticleUpdateArgsSchema;
