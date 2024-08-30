import { Request, Response } from "express";

import { deleteOneToken } from "@/models/tokens";
import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateIdParam,
} from "@/helpers";

type Body = {
  user_id: string | undefined;
};

export function logoutHandler(req: Request<{}, {}, Body>, res: Response) {
  const [userId, valid, message] = validateIdParam(req.body.user_id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const [success, error] = deleteOneToken(userId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!success) {
    sendForbiddenJSON("invalid credentials, user id is not correct", res);
    return;
  }

  sendNoContentJSON(res);
}
