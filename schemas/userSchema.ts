import { z } from "zod";

export const requestPasswpordSchema = z
  .string()
  .min(8, {
    message: "8文字以上で入力してください",
  })
  .regex(/[a-zA-Z]/, { message: "英字を含めてください" })
  .regex(/[0-9]/, { message: "数字を含めてください" });

export const requestLoginSchema = z.object({
  email: z.string().min(1, { message: "1文字以上入力してください" }),
  password: z.string().min(1, { message: "1文字以上入力してください" }),
});
