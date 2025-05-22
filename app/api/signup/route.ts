import prisma from "@/lib/prisma";
import UserCreateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/UserCreateInputSchema";
import { requestPasswpordSchema } from "@/schemas/userSchema";

export async function POST(request: Request) {
  const res = await request.json();
  const bodyValidation = UserCreateInputSchema.safeParse(res);

  if (!bodyValidation.success) {
    return Response.json(
      {
        error: bodyValidation.error.errors,
      },
      {
        status: 400,
      }
    );
  }

  const { username, email, password } = bodyValidation.data;

  const passwordValidation = requestPasswpordSchema.safeParse(password);

  if (!passwordValidation.success) {
    return Response.json(
      {
        error: passwordValidation.error.errors,
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordValidation.data,
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
