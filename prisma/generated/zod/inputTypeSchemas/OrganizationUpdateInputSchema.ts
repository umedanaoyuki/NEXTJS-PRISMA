import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserOrganizationUpdateManyWithoutOrganizationNestedInputSchema } from './UserOrganizationUpdateManyWithoutOrganizationNestedInputSchema';

export const OrganizationUpdateInputSchema: z.ZodType<Prisma.OrganizationUpdateInput> = z.object({
  name: z.union([ z.string().min(1).max(30),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userOrganizations: z.lazy(() => UserOrganizationUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export default OrganizationUpdateInputSchema;
