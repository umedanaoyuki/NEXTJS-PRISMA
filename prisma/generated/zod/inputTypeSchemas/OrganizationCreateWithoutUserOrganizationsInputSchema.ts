import type { Prisma } from '../../../../app/generated/prisma';

import { z } from 'zod';

export const OrganizationCreateWithoutUserOrganizationsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutUserOrganizationsInput> = z.object({
  name: z.string().min(1).max(30),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default OrganizationCreateWithoutUserOrganizationsInputSchema;
