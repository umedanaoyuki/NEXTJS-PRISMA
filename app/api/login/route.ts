import { signJWT, verifyJWT } from "@/lib/api/auth";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import { withErrorHandler } from "@/prisma/api/handler";
import { requestLoginSchema } from "@/schemas/userSchema";
import bcrypt from "bcryptjs";

export const POST = withErrorHandler(async (request: Request) => {
  const res = await request.json();

  const bodyValidation = validateRequest(res, requestLoginSchema);

  if (!bodyValidation.success) {
    return bodyValidation.error;
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

  const token = await signJWT({
    userId: user.id,
    username: user.username,
  });

  const payload = await verifyJWT(token);

  console.log("loginに成功しました");
  console.log({ payload });

  return Response.json({
    message: "ログインに成功しました",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});
