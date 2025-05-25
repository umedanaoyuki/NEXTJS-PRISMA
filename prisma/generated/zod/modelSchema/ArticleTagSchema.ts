import { z } from 'zod';
import { ArticleWithRelationsSchema, ArticlePartialWithRelationsSchema, ArticleOptionalDefaultsWithRelationsSchema } from './ArticleSchema'
import type { ArticleWithRelations, ArticlePartialWithRelations, ArticleOptionalDefaultsWithRelations } from './ArticleSchema'
import { TagWithRelationsSchema, TagPartialWithRelationsSchema, TagOptionalDefaultsWithRelationsSchema } from './TagSchema'
import type { TagWithRelations, TagPartialWithRelations, TagOptionalDefaultsWithRelations } from './TagSchema'

/////////////////////////////////////////
// ARTICLE TAG SCHEMA
/////////////////////////////////////////

export const ArticleTagSchema = z.object({
  id: z.number().int(),
  articleId: z.number().int(),
  tagId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ArticleTag = z.infer<typeof ArticleTagSchema>

/////////////////////////////////////////
// ARTICLE TAG PARTIAL SCHEMA
/////////////////////////////////////////

export const ArticleTagPartialSchema = ArticleTagSchema.partial()

export type ArticleTagPartial = z.infer<typeof ArticleTagPartialSchema>

/////////////////////////////////////////
// ARTICLE TAG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ArticleTagOptionalDefaultsSchema = ArticleTagSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ArticleTagOptionalDefaults = z.infer<typeof ArticleTagOptionalDefaultsSchema>

/////////////////////////////////////////
// ARTICLE TAG RELATION SCHEMA
/////////////////////////////////////////

export type ArticleTagRelations = {
  article: ArticleWithRelations;
  tag: TagWithRelations;
};

export type ArticleTagWithRelations = z.infer<typeof ArticleTagSchema> & ArticleTagRelations

export const ArticleTagWithRelationsSchema: z.ZodType<ArticleTagWithRelations> = ArticleTagSchema.merge(z.object({
  article: z.lazy(() => ArticleWithRelationsSchema),
  tag: z.lazy(() => TagWithRelationsSchema),
}))

/////////////////////////////////////////
// ARTICLE TAG OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ArticleTagOptionalDefaultsRelations = {
  article: ArticleOptionalDefaultsWithRelations;
  tag: TagOptionalDefaultsWithRelations;
};

export type ArticleTagOptionalDefaultsWithRelations = z.infer<typeof ArticleTagOptionalDefaultsSchema> & ArticleTagOptionalDefaultsRelations

export const ArticleTagOptionalDefaultsWithRelationsSchema: z.ZodType<ArticleTagOptionalDefaultsWithRelations> = ArticleTagOptionalDefaultsSchema.merge(z.object({
  article: z.lazy(() => ArticleOptionalDefaultsWithRelationsSchema),
  tag: z.lazy(() => TagOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// ARTICLE TAG PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ArticleTagPartialRelations = {
  article?: ArticlePartialWithRelations;
  tag?: TagPartialWithRelations;
};

export type ArticleTagPartialWithRelations = z.infer<typeof ArticleTagPartialSchema> & ArticleTagPartialRelations

export const ArticleTagPartialWithRelationsSchema: z.ZodType<ArticleTagPartialWithRelations> = ArticleTagPartialSchema.merge(z.object({
  article: z.lazy(() => ArticlePartialWithRelationsSchema),
  tag: z.lazy(() => TagPartialWithRelationsSchema),
})).partial()

export type ArticleTagOptionalDefaultsWithPartialRelations = z.infer<typeof ArticleTagOptionalDefaultsSchema> & ArticleTagPartialRelations

export const ArticleTagOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ArticleTagOptionalDefaultsWithPartialRelations> = ArticleTagOptionalDefaultsSchema.merge(z.object({
  article: z.lazy(() => ArticlePartialWithRelationsSchema),
  tag: z.lazy(() => TagPartialWithRelationsSchema),
}).partial())

export type ArticleTagWithPartialRelations = z.infer<typeof ArticleTagSchema> & ArticleTagPartialRelations

export const ArticleTagWithPartialRelationsSchema: z.ZodType<ArticleTagWithPartialRelations> = ArticleTagSchema.merge(z.object({
  article: z.lazy(() => ArticlePartialWithRelationsSchema),
  tag: z.lazy(() => TagPartialWithRelationsSchema),
}).partial())

export default ArticleTagSchema;
