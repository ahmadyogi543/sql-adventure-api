import { verify } from "jsonwebtoken";

import { config } from "@/config";
import { UserPayload } from "@/types";

export function verifyJWT(
  token: string,
  onTokenExpiredError: (message: string) => void,
  onError: (message: string) => void,
  onSuccess: (user: UserPayload) => void
) {
  verify(token, config.JWT_SECRET_KEY, (err, user: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        onTokenExpiredError("bad credentials, token expired");
      } else {
        onError("bad credentials, token in invalid signature");
      }
      return;
    }

    onSuccess(user as UserPayload);
  });
}
