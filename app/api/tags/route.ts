import { withAuth } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import TagCreateWithoutArticleTagInputSchema from "@/prisma/generated/zod/inputTypeSchemas/TagCreateWithoutArticleTagInputSchema";
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

  const tags = await prisma.article.findMany({
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json(tags);
});

export const POST = withAuth(async (request: NextRequest) => {
  const res = await request.json();
  const bodyValidation = validateRequest(
    res,
    TagCreateWithoutArticleTagInputSchema
  );

  if (!bodyValidation.success) {
    return bodyValidation.error;
  }

  const { name } = bodyValidation.data;

  const article = await prisma.tag.create({
    data: {
      name,
    },
  });

  return Response.json({ article });
});
