import { PrismaClient } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z, ZodErrorMap } from "zod";
import { USER_FIELD_NAMES } from "./constants/user";

const FIELD_NAMES = {
  ...USER_FIELD_NAMES,
};

const customErrorMap: ZodErrorMap = (issue, ctx) => {
  const filedNames = issue.path
    .map((name) => FIELD_NAMES[name as keyof typeof FIELD_NAMES] ?? name)
    .join(",");
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return {
        message: `${filedNames}は${issue.expected}型で入力してください`,
      };
    case z.ZodIssueCode.invalid_string:
      return { message: `${filedNames}の形式が異なります` };
    case z.ZodIssueCode.too_small:
      return {
        message: `${filedNames}は${issue.minimum}文字以上で入力してください`,
      };
    case z.ZodIssueCode.too_big:
      return {
        message: `${filedNames}は${issue.maximum}文字以内で入力してください`,
      };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
