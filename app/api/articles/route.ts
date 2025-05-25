import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import ArticleCreateManyUserInputSchema from "@/prisma/generated/zod/inputTypeSchemas/ArticleCreateManyUserInputSchema";

export const POST = withAuth(async (request: Request, userId: number) => {
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
