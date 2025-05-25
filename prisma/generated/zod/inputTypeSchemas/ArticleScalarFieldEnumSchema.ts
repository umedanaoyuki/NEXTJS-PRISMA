import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','title','content','userId','createdAt','updatedAt']);

export default ArticleScalarFieldEnumSchema;
