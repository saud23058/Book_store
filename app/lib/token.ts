import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY!);
  return token;
}

export function verifyToken(token: string) {
  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
  return verifiedToken;
}

