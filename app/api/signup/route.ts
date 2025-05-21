import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();

  const { username, email, password } = res;

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
