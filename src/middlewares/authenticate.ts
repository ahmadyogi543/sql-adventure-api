import { NextFunction, Response } from "express";

import { AuthRequest } from "@/types";
import {
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  verifyJWT,
} from "@/helpers";
import { findOneBannedToken } from "@/models/tokens";

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    sendForbiddenJSON("crendentials is not provided or in invalid format", res);
    return;
  }

  const [found, error] = findOneBannedToken(token);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (found) {
    sendForbiddenJSON("bad credentials, token is invalid", res);
    return;
  }

  verifyJWT(
    token,
    // on token expired error
    (message) => sendForbiddenJSON(message, res),
    // on error
    (message) => sendForbiddenJSON(message, res),
    // on success
    (user) => {
      req.user = user;
      next();
    }
  );
}
