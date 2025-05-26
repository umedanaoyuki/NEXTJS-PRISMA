import { z } from 'zod';
import { ArticleTagWithRelationsSchema, ArticleTagPartialWithRelationsSchema, ArticleTagOptionalDefaultsWithRelationsSchema } from './ArticleTagSchema'
import type { ArticleTagWithRelations, ArticleTagPartialWithRelations, ArticleTagOptionalDefaultsWithRelations } from './ArticleTagSchema'

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// TAG PARTIAL SCHEMA
/////////////////////////////////////////

export const TagPartialSchema = TagSchema.partial()

export type TagPartial = z.infer<typeof TagPartialSchema>

/////////////////////////////////////////
// TAG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TagOptionalDefaultsSchema = TagSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TagOptionalDefaults = z.infer<typeof TagOptionalDefaultsSchema>

/////////////////////////////////////////
// TAG RELATION SCHEMA
/////////////////////////////////////////

export type TagRelations = {
  articleTags: ArticleTagWithRelations[];
};

export type TagWithRelations = z.infer<typeof TagSchema> & TagRelations

export const TagWithRelationsSchema: z.ZodType<TagWithRelations> = TagSchema.merge(z.object({
  articleTags: z.lazy(() => ArticleTagWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TAG OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TagOptionalDefaultsRelations = {
  articleTags: ArticleTagOptionalDefaultsWithRelations[];
};

export type TagOptionalDefaultsWithRelations = z.infer<typeof TagOptionalDefaultsSchema> & TagOptionalDefaultsRelations

export const TagOptionalDefaultsWithRelationsSchema: z.ZodType<TagOptionalDefaultsWithRelations> = TagOptionalDefaultsSchema.merge(z.object({
  articleTags: z.lazy(() => ArticleTagOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TAG PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type TagPartialRelations = {
  articleTags?: ArticleTagPartialWithRelations[];
};

export type TagPartialWithRelations = z.infer<typeof TagPartialSchema> & TagPartialRelations

export const TagPartialWithRelationsSchema: z.ZodType<TagPartialWithRelations> = TagPartialSchema.merge(z.object({
  articleTags: z.lazy(() => ArticleTagPartialWithRelationsSchema).array(),
})).partial()

export type TagOptionalDefaultsWithPartialRelations = z.infer<typeof TagOptionalDefaultsSchema> & TagPartialRelations

export const TagOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TagOptionalDefaultsWithPartialRelations> = TagOptionalDefaultsSchema.merge(z.object({
  articleTags: z.lazy(() => ArticleTagPartialWithRelationsSchema).array(),
}).partial())

export type TagWithPartialRelations = z.infer<typeof TagSchema> & TagPartialRelations

export const TagWithPartialRelationsSchema: z.ZodType<TagWithPartialRelations> = TagSchema.merge(z.object({
  articleTags: z.lazy(() => ArticleTagPartialWithRelationsSchema).array(),
}).partial())

export default TagSchema;
