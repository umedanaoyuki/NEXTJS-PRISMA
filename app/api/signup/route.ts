import { withErrorHandler } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import UserCreateInputSchema from "@/prisma/generated/zod/inputTypeSchemas/UserCreateInputSchema";
import { requestPasswpordSchema } from "@/schemas/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const res = await request.json();

  const bodyValidation = validateRequest(res, UserCreateInputSchema);

  if (!bodyValidation.success) {
    return bodyValidation.error;
  }

  const { username, email, password } = bodyValidation.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser != null) {
    return Response.json(
      { error: "メールアドレスまたはユーザーはすでに使用されています" },
      { status: 400 }
    );
  }

  const passwordValidation = validateRequest(password, requestPasswpordSchema);

  if (!passwordValidation.success) {
    return passwordValidation.error;
  }

  const hash = bcrypt.hashSync(passwordValidation.data, 10);

  try {
    const user = await prisma.user.create({
      select: {
        id: true,
      },
      data: {
        username,
        email,
        password: hash,
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
});
