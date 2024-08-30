import { NextFunction, Response } from "express";

import { AuthRequest } from "@/types";
import { deleteOneToken } from "@/models/tokens";
import {
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  verifyJWT,
} from "@/helpers";

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    sendForbiddenJSON("crendentials is not provided", res);
    return;
  }

  verifyJWT(
    token,
    (message) => {
      const [success, error] = deleteOneToken(1);
      if (error) {
        sendInternalServerErrorJSON(error, res);
        return;
      }

      if (!success) {
        sendForbiddenJSON("invalid credentials, user id is not correct", res);
        return;
      }

      sendForbiddenJSON(message, res);
    },
    (message) => sendForbiddenJSON(message, res),
    (user) => {
      req.user = user;
      next();
    }
  );
}
