import { z } from 'zod';
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'
import { UserWithRelationsSchema, UserPartialWithRelationsSchema, UserOptionalDefaultsWithRelationsSchema } from './UserSchema'
import type { UserWithRelations, UserPartialWithRelations, UserOptionalDefaultsWithRelations } from './UserSchema'
import { OrganizationWithRelationsSchema, OrganizationPartialWithRelationsSchema, OrganizationOptionalDefaultsWithRelationsSchema } from './OrganizationSchema'
import type { OrganizationWithRelations, OrganizationPartialWithRelations, OrganizationOptionalDefaultsWithRelations } from './OrganizationSchema'

/////////////////////////////////////////
// USER ORGANIZATION SCHEMA
/////////////////////////////////////////

export const UserOrganizationSchema = z.object({
  role: RoleSchema,
  id: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserOrganization = z.infer<typeof UserOrganizationSchema>

/////////////////////////////////////////
// USER ORGANIZATION PARTIAL SCHEMA
/////////////////////////////////////////

export const UserOrganizationPartialSchema = UserOrganizationSchema.partial()

export type UserOrganizationPartial = z.infer<typeof UserOrganizationPartialSchema>

/////////////////////////////////////////
// USER ORGANIZATION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOrganizationOptionalDefaultsSchema = UserOrganizationSchema.merge(z.object({
  role: RoleSchema.optional(),
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOrganizationOptionalDefaults = z.infer<typeof UserOrganizationOptionalDefaultsSchema>

/////////////////////////////////////////
// USER ORGANIZATION RELATION SCHEMA
/////////////////////////////////////////

export type UserOrganizationRelations = {
  user: UserWithRelations;
  organization: OrganizationWithRelations;
};

export type UserOrganizationWithRelations = z.infer<typeof UserOrganizationSchema> & UserOrganizationRelations

export const UserOrganizationWithRelationsSchema: z.ZodType<UserOrganizationWithRelations> = UserOrganizationSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  organization: z.lazy(() => OrganizationWithRelationsSchema),
}))

/////////////////////////////////////////
// USER ORGANIZATION OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UserOrganizationOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  organization: OrganizationOptionalDefaultsWithRelations;
};

export type UserOrganizationOptionalDefaultsWithRelations = z.infer<typeof UserOrganizationOptionalDefaultsSchema> & UserOrganizationOptionalDefaultsRelations

export const UserOrganizationOptionalDefaultsWithRelationsSchema: z.ZodType<UserOrganizationOptionalDefaultsWithRelations> = UserOrganizationOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  organization: z.lazy(() => OrganizationOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// USER ORGANIZATION PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserOrganizationPartialRelations = {
  user?: UserPartialWithRelations;
  organization?: OrganizationPartialWithRelations;
};

export type UserOrganizationPartialWithRelations = z.infer<typeof UserOrganizationPartialSchema> & UserOrganizationPartialRelations

export const UserOrganizationPartialWithRelationsSchema: z.ZodType<UserOrganizationPartialWithRelations> = UserOrganizationPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  organization: z.lazy(() => OrganizationPartialWithRelationsSchema),
})).partial()

export type UserOrganizationOptionalDefaultsWithPartialRelations = z.infer<typeof UserOrganizationOptionalDefaultsSchema> & UserOrganizationPartialRelations

export const UserOrganizationOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOrganizationOptionalDefaultsWithPartialRelations> = UserOrganizationOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  organization: z.lazy(() => OrganizationPartialWithRelationsSchema),
}).partial())

export type UserOrganizationWithPartialRelations = z.infer<typeof UserOrganizationSchema> & UserOrganizationPartialRelations

export const UserOrganizationWithPartialRelationsSchema: z.ZodType<UserOrganizationWithPartialRelations> = UserOrganizationSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  organization: z.lazy(() => OrganizationPartialWithRelationsSchema),
}).partial())

export default UserOrganizationSchema;
