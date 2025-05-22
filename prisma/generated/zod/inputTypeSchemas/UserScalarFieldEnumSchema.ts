import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','password','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
