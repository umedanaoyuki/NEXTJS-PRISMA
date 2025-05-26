import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const OrganizationUncheckedCreateWithoutUserOrganizationsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutUserOrganizationsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default OrganizationUncheckedCreateWithoutUserOrganizationsInputSchema;
