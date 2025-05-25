import * as jose from "jose";
import { cookies } from "next/headers";

export type JWTPayload = {
  userId: number;
  username: string;
};

const JWT_SECRET = process.env.JWT_SECRET ?? "invalid";

const ISSUER = "prisma-practice";
const AUDIENCE = "prisma-practice-web";

export const signJWT = async (payload: JWTPayload): Promise<string> => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const alg = "HS256";

  return await new jose.SignJWT({ payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime("24h")
    .sign(secret);
};

export const verifyJWT = async (token: string): Promise<JWTPayload> => {
  const secret = new TextEncoder().encode(JWT_SECRET);

  const { payload } = await jose.jwtVerify<JWTPayload>(token, secret, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });

  return {
    userId: payload.payload.userId,
    username: payload.payload.username,
  };
};

export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
};
