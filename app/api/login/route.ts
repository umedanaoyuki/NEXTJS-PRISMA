import prisma from "@/lib/prisma";
import { withErrorHandler } from "@/prisma/api/handler";
import { requestLoginSchema } from "@/schemas/userSchema";
import bcrypt from "bcryptjs";

export const POST = withErrorHandler(async (request: Request) => {
  const res = await request.json();
  const bodyValidation = requestLoginSchema.safeParse(res);

  if (!bodyValidation.success) {
    return Response.json(
      { error: bodyValidation.error.errors },
      { status: 400 }
    );
  }

  const { email, password } = bodyValidation.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user == null) {
    return Response.json(
      { error: "メールアドレスまたはパスワードが間違っています" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return Response.json(
      { error: "メールアドレスまたはパスワードが間違っています" },
      { status: 401 }
    );
  }

  return Response.json({
    message: "ログインに成功しました",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});
