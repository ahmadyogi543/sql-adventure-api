import { verify } from "jsonwebtoken";

import { config } from "@/config";
import { signJWT } from "./signJWT";

export function verifyJWT(
  token: string,
  onTokenExpiredError: (message: string) => void,
  onError: (message: string) => void,
  onSuccess: (token: string) => void
) {
  verify(token, config.JWT_REFRESH_SECRET_KEY, (err, user: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        onTokenExpiredError("refresh token expired");
      } else {
        onError("invalid refresh token");
      }
      return;
    }

    const { accessToken } = signJWT({
      id: user.id,
      username: user.username,
    });

    onSuccess(accessToken);
  });
}
