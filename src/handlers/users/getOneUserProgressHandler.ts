import { Response, Request } from "express";

import { getOneUserProgress } from "@/models/users";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
  validateIdParam,
} from "@/helpers";

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

  const [userProgress, error] = getOneUserProgress(userId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!userProgress) {
    sendNotFoundJSON(`cannot find progress for user with id ${userId}`, res);
    return;
  }

  sendOKJSON(
    { user_progress: userProgress },
    "retrieved one user progress successfully",
    res
  );
}
