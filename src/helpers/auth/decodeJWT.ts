import { decode } from "jsonwebtoken";

import { UserPayload } from "@/middlewares/types";

export function decodeJWT(token: string) {
  const decoded = decode(token);
  return decoded as UserPayload;
}
