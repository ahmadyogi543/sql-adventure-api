import { Response, Request } from "express";

import { getOneUserProgress } from "@/models/users";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers/responseSender";
import { validateIdParam } from "@/helpers/validator";

type GetOneUserProgressParams = {
  userId: string | undefined;
};

export function getOneUserProgressHandler(
  req: Request<GetOneUserProgressParams, {}, {}>,
  res: Response
) {
  const [userId, valid, message] = validateIdParam(req.params.userId);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const result = getOneUserProgress(userId);
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  if (!result.userProgress) {
    sendNotFoundJSON(`cannot find progress for user with id ${userId}`, res);
    return;
  }

  sendOKJSON(
    { user_progress: result.userProgress },
    "retrieved one user progress successfully",
    res
  );
}
