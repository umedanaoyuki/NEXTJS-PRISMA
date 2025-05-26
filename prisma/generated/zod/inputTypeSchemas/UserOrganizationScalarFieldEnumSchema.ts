import { z } from 'zod';

export const UserOrganizationScalarFieldEnumSchema = z.enum(['id','role','userId','organizationId','createdAt','updatedAt']);

export default UserOrganizationScalarFieldEnumSchema;
