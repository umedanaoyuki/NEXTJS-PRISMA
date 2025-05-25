import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import ArticleUpdateWithoutUserInputSchema from "@/prisma/generated/zod/inputTypeSchemas/ArticleUpdateWithoutUserInputSchema";
import { pathIdSchema } from "@/schemas/requestSchema";
import { NextRequest } from "next/server";

export const GET = withAuth(
  async (_request: NextRequest, _userId: number, pathParams?: PathParams) => {
    const params = await pathParams?.params;
    const idValidation = validateRequest(params, pathIdSchema);

    if (!idValidation.success) {
      return idValidation.error;
    }

    const { id } = idValidation.data;

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (article == null) {
      return Response.json({ error: "記事が見つかりません" }, { status: 404 });
    }

    return Response.json(article);
  }
);

export const PUT = withAuth(
  async (request: NextRequest, _userId: number, pathParams?: PathParams) => {
    const params = await pathParams?.params;
    const idValidation = validateRequest(params, pathIdSchema);

    if (!idValidation.success) {
      return idValidation.error;
    }

    const { id } = idValidation.data;

    const res = await request.json();
    const bodyValidation = validateRequest(
      res,
      ArticleUpdateWithoutUserInputSchema
    );

    if (!bodyValidation.success) {
      return bodyValidation.error;
    }

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (article == null) {
      return Response.json({ error: "記事が見つかりません" }, { status: 404 });
    }

    if (article.userId !== _userId) {
      return Response.json({ error: "権限がありません" }, { status: 403 });
    }

    const { title, content } = bodyValidation.data;

    const updatedArticle = await prisma.article.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return Response.json(updatedArticle);
  }
);
