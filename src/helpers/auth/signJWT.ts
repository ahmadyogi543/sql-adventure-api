import { sign } from "jsonwebtoken";

import { config } from "@/config";

export function signJWT(data: any) {
  const token = sign(data, config.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });

  return token;
}
