import { z } from 'zod';
import { UserWithRelationsSchema, UserPartialWithRelationsSchema, UserOptionalDefaultsWithRelationsSchema } from './UserSchema'
import type { UserWithRelations, UserPartialWithRelations, UserOptionalDefaultsWithRelations } from './UserSchema'
import { ArticleTagWithRelationsSchema, ArticleTagPartialWithRelationsSchema, ArticleTagOptionalDefaultsWithRelationsSchema } from './ArticleTagSchema'
import type { ArticleTagWithRelations, ArticleTagPartialWithRelations, ArticleTagOptionalDefaultsWithRelations } from './ArticleTagSchema'

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  userId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// ARTICLE PARTIAL SCHEMA
/////////////////////////////////////////

export const ArticlePartialSchema = ArticleSchema.partial()

export type ArticlePartial = z.infer<typeof ArticlePartialSchema>

/////////////////////////////////////////
// ARTICLE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ArticleOptionalDefaultsSchema = ArticleSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ArticleOptionalDefaults = z.infer<typeof ArticleOptionalDefaultsSchema>

/////////////////////////////////////////
// ARTICLE RELATION SCHEMA
/////////////////////////////////////////

export type ArticleRelations = {
  user: UserWithRelations;
  ArticleTag: ArticleTagWithRelations[];
};

export type ArticleWithRelations = z.infer<typeof ArticleSchema> & ArticleRelations

export const ArticleWithRelationsSchema: z.ZodType<ArticleWithRelations> = ArticleSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  ArticleTag: z.lazy(() => ArticleTagWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ARTICLE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ArticleOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  ArticleTag: ArticleTagOptionalDefaultsWithRelations[];
};

export type ArticleOptionalDefaultsWithRelations = z.infer<typeof ArticleOptionalDefaultsSchema> & ArticleOptionalDefaultsRelations

export const ArticleOptionalDefaultsWithRelationsSchema: z.ZodType<ArticleOptionalDefaultsWithRelations> = ArticleOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  ArticleTag: z.lazy(() => ArticleTagOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ARTICLE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ArticlePartialRelations = {
  user?: UserPartialWithRelations;
  ArticleTag?: ArticleTagPartialWithRelations[];
};

export type ArticlePartialWithRelations = z.infer<typeof ArticlePartialSchema> & ArticlePartialRelations

export const ArticlePartialWithRelationsSchema: z.ZodType<ArticlePartialWithRelations> = ArticlePartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  ArticleTag: z.lazy(() => ArticleTagPartialWithRelationsSchema).array(),
})).partial()

export type ArticleOptionalDefaultsWithPartialRelations = z.infer<typeof ArticleOptionalDefaultsSchema> & ArticlePartialRelations

export const ArticleOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ArticleOptionalDefaultsWithPartialRelations> = ArticleOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  ArticleTag: z.lazy(() => ArticleTagPartialWithRelationsSchema).array(),
}).partial())

export type ArticleWithPartialRelations = z.infer<typeof ArticleSchema> & ArticlePartialRelations

export const ArticleWithPartialRelationsSchema: z.ZodType<ArticleWithPartialRelations> = ArticleSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  ArticleTag: z.lazy(() => ArticleTagPartialWithRelationsSchema).array(),
}).partial())

export default ArticleSchema;
