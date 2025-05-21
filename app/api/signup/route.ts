import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();

  const { username, email, password } = res;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  return Response.json({ user });
}
