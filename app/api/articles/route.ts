import { getAuthToken, verifyJWT } from "@/lib/api/auth";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import { withErrorHandler } from "@/prisma/api/handler";
import ArticleCreateManyUserInputSchema from "@/prisma/generated/zod/inputTypeSchemas/ArticleCreateManyUserInputSchema";

export const POST = withErrorHandler(async (request: Request) => {
  const token = await getAuthToken();

  if (token == null) {
    return Response.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { userId } = await verifyJWT(token);

  const res = await request.json();

  const bodyValidation = validateRequest(res, ArticleCreateManyUserInputSchema);

  if (!bodyValidation.success) {
    return bodyValidation.error;
  }

  const { title, content } = bodyValidation.data;

  const article = await prisma.article.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return Response.json({ article });
});
