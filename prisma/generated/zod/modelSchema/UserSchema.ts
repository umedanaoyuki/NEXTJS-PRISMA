import { z } from 'zod';
import { ArticleWithRelationsSchema, ArticlePartialWithRelationsSchema, ArticleOptionalDefaultsWithRelationsSchema } from './ArticleSchema'
import type { ArticleWithRelations, ArticlePartialWithRelations, ArticleOptionalDefaultsWithRelations } from './ArticleSchema'
import { UserOrganizationWithRelationsSchema, UserOrganizationPartialWithRelationsSchema, UserOrganizationOptionalDefaultsWithRelationsSchema } from './UserOrganizationSchema'
import type { UserOrganizationWithRelations, UserOrganizationPartialWithRelations, UserOrganizationOptionalDefaultsWithRelations } from './UserOrganizationSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  articles: ArticleWithRelations[];
  userOrganizations: UserOrganizationWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  articles: z.lazy(() => ArticleWithRelationsSchema).array(),
  userOrganizations: z.lazy(() => UserOrganizationWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UserOptionalDefaultsRelations = {
  articles: ArticleOptionalDefaultsWithRelations[];
  userOrganizations: UserOrganizationOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  articles: z.lazy(() => ArticleOptionalDefaultsWithRelationsSchema).array(),
  userOrganizations: z.lazy(() => UserOrganizationOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserPartialRelations = {
  articles?: ArticlePartialWithRelations[];
  userOrganizations?: UserOrganizationPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  articles: z.lazy(() => ArticlePartialWithRelationsSchema).array(),
  userOrganizations: z.lazy(() => UserOrganizationPartialWithRelationsSchema).array(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  articles: z.lazy(() => ArticlePartialWithRelationsSchema).array(),
  userOrganizations: z.lazy(() => UserOrganizationPartialWithRelationsSchema).array(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  articles: z.lazy(() => ArticlePartialWithRelationsSchema).array(),
  userOrganizations: z.lazy(() => UserOrganizationPartialWithRelationsSchema).array(),
}).partial())

export default UserSchema;
