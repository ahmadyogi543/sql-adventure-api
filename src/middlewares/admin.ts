import { NextFunction, Request, Response } from "express";

import { UserPayload } from "./types";
import { sendForbiddenJSON, sendInternalServerErrorJSON } from "@/helpers";

interface AdminRequest extends Request {
  user?: UserPayload;
}

export function admin(req: AdminRequest, res: Response, next: NextFunction) {
  const user = req.user;

  if (!user) {
    sendInternalServerErrorJSON(new Error("user as request is not set"), res);
    return;
  }

  if (user.role !== "admin") {
    sendForbiddenJSON("user is forbidden to access this resource", res);
    return;
  }

  next();
}
