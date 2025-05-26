import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import { paginationQuerySchema, pathIdSchema } from "@/schemas/requestSchema";
import { NextRequest } from "next/server";

export const GET = withAuth(
  async (request: NextRequest, _userId: number, pathParams?: PathParams) => {
    const params = await pathParams?.params;
    const idValidation = validateRequest(params, pathIdSchema);

    if (!idValidation.success) {
      return idValidation.error;
    }

    const { id } = idValidation.data;

    const searchParams = request.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams);
    const queryValidation = validateRequest(query, paginationQuerySchema);

    if (!queryValidation.success) {
      return queryValidation.error;
    }

    const { take, skip } = queryValidation.data;

    const articles = await prisma.article.findMany({
      where: {
        articleTags: {
          some: {
            tagId: id,
          },
        },
      },
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
  }
);
