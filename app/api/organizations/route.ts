import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import OrganizationCreateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/OrganizationCreateInputSchema";
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

  const organizations = await prisma.organization.findMany({
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json(organizations);
});

export const POST = withAuth(async (request: NextRequest, userId: number) => {
  const res = await request.json();
  const bodyValidation = validateRequest(
    {
      ...res,
      userOrganizations: {
        create: {
          userId,
          role: "ADMIN",
        },
      },
    },
    OrganizationCreateInputSchema
  );

  if (!bodyValidation.success) {
    return bodyValidation.error;
  }

  const organization = await prisma.organization.create({
    data: bodyValidation.data,
  });

  console.log({ organization });

  return Response.json(organization);
});
