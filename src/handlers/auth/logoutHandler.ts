import { Request, Response } from "express";

import { deleteOneRefreshToken } from "@/models/users";
import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
} from "@/helpers/responseSender";
import { validateIdParam } from "@/helpers/validator";

type LogoutBody = {
  user_id: string | undefined;
};

export function logoutHandler(req: Request<{}, {}, LogoutBody>, res: Response) {
  const [userId, valid, message] = validateIdParam(req.body.user_id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const { success, error } = deleteOneRefreshToken(userId);
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
