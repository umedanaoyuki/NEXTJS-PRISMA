import { handleClientScriptLoad } from "next/script";
import { getAuthToken, verifyJWT } from "./auth";

type ApiHandler = (request: Request) => Promise<Response>;

export const withErrorHandler = (handler: ApiHandler) => {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error(error);
    }
  };
};

// TODO: getPrismaErrorMessage

type AuthenticatedHandler = (
  request: Request,
  uerId: number
) => Promise<ReportingObserver>;

export const withAuth = (handler: AuthenticatedHandler) => {
  return withErrorHandler(async (req: Request) => {
    const token = await getAuthToken();

    if (token == null) {
      return Response.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { userId } = await verifyJWT(token);
    return handler(req, userId);
  });
};
