import { getAuthToken, verifyJWT } from "@/lib/api/auth";
import { USER_FIELD_NAMES } from "@/lib/constants/user";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export type PathParams = { params: Promise<{ [key: string]: string }> };

type ApiHandler = (
  request: NextRequest,
  pathParams?: PathParams
) => Promise<Response>;

type AuthenticatedHandler = (
  request: NextRequest,
  uerId: number,
  pathParams?: PathParams
) => Promise<ReportingObserver>;

export const withErrorHandler = (handler: ApiHandler) => {
  return async (req: NextRequest, pathParams?: PathParams) => {
    try {
      return await handler(req, pathParams);
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

export const withAuth = (handler: AuthenticatedHandler) => {
  return withErrorHandler(async (req: NextRequest, pathParams?: PathParams) => {
    const token = await getAuthToken();

    if (token == null) {
      return Response.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { userId } = await verifyJWT(token);
    return handler(req, userId, pathParams);
  });
};
