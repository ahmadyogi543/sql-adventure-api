import { NextFunction, Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  validateIdParam,
} from "@/helpers";
import { UserPayload } from "./types";
import { config } from "@/config";

type UserParams = {
  id?: string;
};

interface UserRequest extends Request<UserParams> {
  user?: UserPayload;
  id?: number;
}

export function user(req: UserRequest, res: Response, next: NextFunction) {
  const [id, valid, message] = validateIdParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  if (config.TEST_AUTH === "true") {
    req.id = id;

    next();
    return;
  }

  const user = req.user;
  if (user && user.role === "user" && id !== user.id) {
    sendForbiddenJSON("user is forbidden to access this resource", res);
    return;
  }

  req.id = id;

  next();
}
