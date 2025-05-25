import * as jose from "jose";

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

  console.log("veryfyJWT");
  console.log(payload);

  const { userId, username } = payload;

  return {
    userId,
    username,
  };
};
