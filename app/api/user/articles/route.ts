import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
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
    where: {
      userId,
    },
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
