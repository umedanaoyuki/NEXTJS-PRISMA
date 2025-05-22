import prisma from "@/lib/prisma";
import UserCreateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/UserCreateInputSchema";

export async function POST(request: Request) {
  const res = await request.json();
  const bodyValidation = UserCreateInputSchema.safeParse(res);

  if (!bodyValidation.success) {
    return Response.json(
      {
        error: bodyValidation.error,
      },
      {
        status: 400,
      }
    );
  }

  const { username, email, password } = bodyValidation.data;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return Response.json({ user });
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "ユーザーの作成に失敗しました" },
      { status: 500 }
    );
  }
}
