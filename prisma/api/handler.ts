import { USER_FIELD_NAMES } from "@/lib/constants/user";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

type ApiHandler = (request: NextRequest) => Promise<Response>;

export const withErrorHandler = (handler: ApiHandler) => {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (err) {
      console.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return Response.json(
          {
            error: getPrismaErrorMessage(err),
          },
          {
            status: 500,
          }
        );
      }
      return Response.json(
        {
          error: "予期せぬエラーが発生しました",
        },
        {
          status: 500,
        }
      );
    }
  };
};

export const getPrismaErrorMessage = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  switch (error.code) {
    case "P2002":
      const fieldnames =
        (error.meta?.target as string[])
          .map(
            (name) =>
              USER_FIELD_NAMES[name as keyof typeof USER_FIELD_NAMES] ?? name
          )
          .join(",") ?? "特定のフィールド";
      return `${fieldnames}はすでに登録されている情報です`;
    default:
      return "予期せぬエラーが発生しました";
  }
};
