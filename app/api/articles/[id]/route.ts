import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import ArticleCreateManyUserInputSchema from "@/prisma/generated/zod/inputTypeSchemas/ArticleCreateManyUserInputSchema";
import { paginationQuerySchema } from "@/schemas/requestSchema";
import { NextRequest } from "next/server";

export const GET = withAuth(async (request: NextRequest, userId: number) => {
  const searchParams = request.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);
  const queryValidation = validateRequest(query, paginationQuerySchema);

  if (!queryValidation.success) {
    return queryValidation.error;
  }

  const { take, skip } = queryValidation.data;

  const articles = await prisma.article.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json(articles);
});

export const POST = withAuth(async (request: NextRequest, userId: number) => {
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
