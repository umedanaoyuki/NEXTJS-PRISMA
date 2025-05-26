import { z } from 'zod';
import { UserOrganizationWithRelationsSchema, UserOrganizationPartialWithRelationsSchema, UserOrganizationOptionalDefaultsWithRelationsSchema } from './UserOrganizationSchema'
import type { UserOrganizationWithRelations, UserOrganizationPartialWithRelations, UserOrganizationOptionalDefaultsWithRelations } from './UserOrganizationSchema'

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// ORGANIZATION PARTIAL SCHEMA
/////////////////////////////////////////

export const OrganizationPartialSchema = OrganizationSchema.partial()

export type OrganizationPartial = z.infer<typeof OrganizationPartialSchema>

/////////////////////////////////////////
// ORGANIZATION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OrganizationOptionalDefaultsSchema = OrganizationSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OrganizationOptionalDefaults = z.infer<typeof OrganizationOptionalDefaultsSchema>

/////////////////////////////////////////
// ORGANIZATION RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationRelations = {
  userOrganizations: UserOrganizationWithRelations[];
};

export type OrganizationWithRelations = z.infer<typeof OrganizationSchema> & OrganizationRelations

export const OrganizationWithRelationsSchema: z.ZodType<OrganizationWithRelations> = OrganizationSchema.merge(z.object({
  userOrganizations: z.lazy(() => UserOrganizationWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ORGANIZATION OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationOptionalDefaultsRelations = {
  userOrganizations: UserOrganizationOptionalDefaultsWithRelations[];
};

export type OrganizationOptionalDefaultsWithRelations = z.infer<typeof OrganizationOptionalDefaultsSchema> & OrganizationOptionalDefaultsRelations

export const OrganizationOptionalDefaultsWithRelationsSchema: z.ZodType<OrganizationOptionalDefaultsWithRelations> = OrganizationOptionalDefaultsSchema.merge(z.object({
  userOrganizations: z.lazy(() => UserOrganizationOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ORGANIZATION PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationPartialRelations = {
  userOrganizations?: UserOrganizationPartialWithRelations[];
};

export type OrganizationPartialWithRelations = z.infer<typeof OrganizationPartialSchema> & OrganizationPartialRelations

export const OrganizationPartialWithRelationsSchema: z.ZodType<OrganizationPartialWithRelations> = OrganizationPartialSchema.merge(z.object({
  userOrganizations: z.lazy(() => UserOrganizationPartialWithRelationsSchema).array(),
})).partial()

export type OrganizationOptionalDefaultsWithPartialRelations = z.infer<typeof OrganizationOptionalDefaultsSchema> & OrganizationPartialRelations

export const OrganizationOptionalDefaultsWithPartialRelationsSchema: z.ZodType<OrganizationOptionalDefaultsWithPartialRelations> = OrganizationOptionalDefaultsSchema.merge(z.object({
  userOrganizations: z.lazy(() => UserOrganizationPartialWithRelationsSchema).array(),
}).partial())

export type OrganizationWithPartialRelations = z.infer<typeof OrganizationSchema> & OrganizationPartialRelations

export const OrganizationWithPartialRelationsSchema: z.ZodType<OrganizationWithPartialRelations> = OrganizationSchema.merge(z.object({
  userOrganizations: z.lazy(() => UserOrganizationPartialWithRelationsSchema).array(),
}).partial())

export default OrganizationSchema;
