import { NextFunction, Request, Response } from "express";

import { findOneBannedToken } from "@/models/tokens";
import {
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  verifyJWT,
} from "@/helpers";
import { UserPayload } from "./types";
import { config } from "@/config";

interface AuthRequest extends Request {
  user?: UserPayload;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (config.TEST_AUTH === "true") {
    req.user = {
      id: 0,
      username: "test",
      iat: 0,
      exp: 0,
      role: "admin",
    };

    next();
    return;
  }

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
