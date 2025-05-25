import { z } from 'zod';

export const ArticleTagScalarFieldEnumSchema = z.enum(['id','articleId','tagId','createdAt','updatedAt']);

export default ArticleTagScalarFieldEnumSchema;
