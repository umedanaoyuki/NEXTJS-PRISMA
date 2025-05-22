import { z } from "zod";

export const requestPasswpordSchema = z
  .string()
  .min(8, {
    message: "8文字以上で入力してください",
  })
  .regex(/[a-zA-Z]/, { message: "英字を含めてください" })
  .regex(/[0-9]/, { message: "数字を含めてください" });
