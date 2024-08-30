import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { AuthRequest, UserPayload } from "@/types";
import { config } from "@/config";
import { sendForbiddenJSON } from "@/helpers/http/responseSender";

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    sendForbiddenJSON("crendentials is not provided", res);
    return;
  }

  verify(token, config.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      sendForbiddenJSON("invalid credentials, token is not valid", res);
      return;
    }
    req.user = user as UserPayload;

    next();
  });
}
