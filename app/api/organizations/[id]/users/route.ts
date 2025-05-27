import { PathParams, withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import UserOrganizationCreateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/UserOrganizationCreateInputSchema";
import { pathIdSchema } from "@/schemas/requestSchema";
import { NextRequest } from "next/server";

export const POST = withAuth(
  async (request: NextRequest, userId: number, pathParams?: PathParams) => {
    const params = await pathParams?.params;
    const idValidation = validateRequest(params, pathIdSchema);
    if (!idValidation.success) {
      return idValidation.error;
    }

    const { id } = idValidation.data;

    const { userId: invitedUserId, role } = await request.json();
    const bodyValidation = validateRequest(
      {
        role,
        user: { connect: { id: userId } },
        organization: { connect: { id } },
        userOrganizations: {
          create: {
            userId: invitedUserId,
            role: "ADMIN",
          },
        },
      },
      UserOrganizationCreateInputSchema
    );

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

    const user = await prisma.user.findUnique({
      where: {
        id: invitedUserId,
      },
    });

    if (user == null) {
      return Response.json(
        { error: "招待するユーザーが見つかりません" },
        { status: 404 }
      );
    }

    const existingUserOrganization = await prisma.userOrganization.findFirst({
      where: {
        userId: invitedUserId,
        organizationId: id,
      },
    });

    if (existingUserOrganization != null) {
      return Response.json(
        { error: "このユーザーは既に組織に所属しています" },
        { status: 400 }
      );
    }

    const userOrganization = await prisma.userOrganization.create({
      data: bodyValidation.data,
    });

    return Response.json(userOrganization);
  }
);
