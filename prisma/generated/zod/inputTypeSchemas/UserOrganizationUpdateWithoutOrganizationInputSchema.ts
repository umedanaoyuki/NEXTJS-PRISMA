import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { EnumRoleFieldUpdateOperationsInputSchema } from './EnumRoleFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutUserOrganizationsNestedInputSchema } from './UserUpdateOneRequiredWithoutUserOrganizationsNestedInputSchema';

export const UserOrganizationUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.UserOrganizationUpdateWithoutOrganizationInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserOrganizationsNestedInputSchema).optional()
}).strict();

export default UserOrganizationUpdateWithoutOrganizationInputSchema;
