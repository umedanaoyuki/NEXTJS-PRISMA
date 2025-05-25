import { z } from "zod";

export const paginationQuerySchema = z.object({
  take: z
    .string()
    .optional()
    .transform((val) => (val == undefined ? val : parseInt(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "takeの引数が異なります",
    }),
  skip: z
    .string()
    .optional()
    .transform((val) => (val == undefined ? val : parseInt(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "skipの引数が異なります",
    }),
}) as z.ZodType<{
  take?: number;
  skip?: number;
}>;

export const pathIdSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), {
      message: "idの形式が異なります",
    }),
});
