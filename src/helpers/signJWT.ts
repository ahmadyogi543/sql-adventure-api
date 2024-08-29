import { sign } from "jsonwebtoken";

import { config } from "@/config";

export function signJWT(data: any) {
  const accessToken = sign(data, config.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  const refreshToken = sign(data, config.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken,
  };
}
