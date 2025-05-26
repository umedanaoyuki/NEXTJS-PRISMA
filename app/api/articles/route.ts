import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import ArticleCreateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/ArticleCreateInputSchema";
import { paginationQuerySchema } from "@/schemas/requestSchema";
import { NextRequest } from "next/server";

export const GET = withAuth(async (request: NextRequest) => {
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
      articleTags: {
        include: {
          tag: true,
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
  const { tagIds, ...res } = await request.json();
  const bodyValidation = validateRequest(
    {
      ...res,
      user: {
        connect: {
          id: userId,
        },
      },
      articleTags: {
        create: tagIds.map((tagId: number) => ({
          tagId,
        })),
      },
    },
    ArticleCreateInputSchema
  );

  if (!bodyValidation.success) {
    return bodyValidation.error;
  }

  const article = await prisma.article.create({
    data: bodyValidation.data,
  });

  return Response.json({ article });
});
