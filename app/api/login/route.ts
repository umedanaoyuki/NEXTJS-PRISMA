import { setAuthCookie, signJWT, verifyJWT } from "@/lib/api/auth";
import { withErrorHandler } from "@/lib/api/handler";
import { validateRequest } from "@/lib/api/validation";
import prisma from "@/lib/prisma";
import { requestLoginSchema } from "@/schemas/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
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

  console.log("token", token);

  const payload = await verifyJWT(token);

  console.log("payload", payload);

  await setAuthCookie(token);

  return Response.json({
    message: "ログインに成功しました",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});
