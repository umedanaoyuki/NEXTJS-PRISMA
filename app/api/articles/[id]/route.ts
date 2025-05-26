import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import ArticleUpdateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/ArticleUpdateInputSchema";
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
        articleTags: {
          include: {
            tag: true,
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

    const { tagIds, ...res } = await request.json();
    const bodyValidation = validateRequest(
      {
        ...res,
        user: {
          connect: {
            id: _userId,
          },
        },
        articleTags: {
          create: tagIds.map((tagId: number) => ({
            tagId,
          })),
        },
      },
      ArticleUpdateInputSchema
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

    console.log({ article });

    if (article.userId !== _userId) {
      return Response.json({ error: "権限がありません" }, { status: 403 });
    }

    const updateArticle = await prisma.$transaction(async (tx) => {
      await tx.articleTag.deleteMany({
        where: {
          articleId: id,
        },
      });
      return await tx.article.update({
        where: {
          id,
        },
        data: bodyValidation.data,
      });
    });

    return Response.json(updateArticle);
  }
);

export const DELETE = withAuth(
  async (request: NextRequest, _userId: number, pathParams?: PathParams) => {
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
    });

    if (article == null) {
      return Response.json({ error: "記事が見つかりません" }, { status: 404 });
    }

    if (article.userId !== _userId) {
      return Response.json({ error: "権限がありません" }, { status: 403 });
    }

    await prisma.article.delete({
      where: {
        id,
      },
    });

    return Response.json({ message: "記事を削除しました" });
  }
);
