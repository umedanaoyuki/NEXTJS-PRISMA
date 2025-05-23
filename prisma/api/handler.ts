type ApiHandler = (request: Request) => Promise<Response>;

export const withErrorHandler = (handler: ApiHandler) => {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error(error);
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
