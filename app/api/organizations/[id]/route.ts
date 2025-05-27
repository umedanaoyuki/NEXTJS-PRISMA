import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import OrganizationUpdateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/OrganizationUpdateInputSchema";
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

    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        userOrganizations: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (organization == null) {
      return Response.json({ error: "組織が存在しません" }, { status: 404 });
    }

    return Response.json(organization);
  }
);

export const PUT = withAuth(
  async (request: NextRequest, userId: number, pathParams?: PathParams) => {
    const params = await pathParams?.params;
    const idValidation = validateRequest(params, pathIdSchema);

    if (!idValidation.success) {
      return idValidation.error;
    }

    const { id } = idValidation.data;

    const res = await request.json();
    const bodyValidation = validateRequest(res, OrganizationUpdateInputSchema);

    if (!bodyValidation.success) {
      return bodyValidation.error;
    }

    const organization = await prisma.userOrganization.findFirst({
      where: {
        userId,
        organizationId: id,
        role: "ADMIN",
      },
    });

    if (organization == null) {
      return Response.json(
        { error: "組織が存在しない、もしくは権限がありません" },
        { status: 404 }
      );
    }

    const updateOrganization = await prisma.organization.update({
      where: {
        id,
      },
      data: bodyValidation.data,
    });

    return Response.json(updateOrganization);
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
