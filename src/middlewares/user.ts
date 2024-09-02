import { NextFunction, Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  validateNumberParam,
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
  const [id, valid, message] = validateNumberParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  if (config.PASS_AUTH === "true") {
    // for testing, it's tedious to write token all the time
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
