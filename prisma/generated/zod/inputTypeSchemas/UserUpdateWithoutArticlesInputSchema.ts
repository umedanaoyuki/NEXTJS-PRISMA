import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserOrganizationUpdateManyWithoutUserNestedInputSchema } from './UserOrganizationUpdateManyWithoutUserNestedInputSchema';

export const UserUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateWithoutArticlesInput> = z.object({
  username: z.union([ z.string().min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userOrganizations: z.lazy(() => UserOrganizationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUpdateWithoutArticlesInputSchema;
