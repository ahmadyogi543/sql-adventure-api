import { Response, Request } from "express";

import { getOneUserProgress } from "@/models/users";
import {
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers";

interface GetOneProgressRequest extends Request {
  id?: number;
}

export function getOneUserProgressHandler(
  req: GetOneProgressRequest,
  res: Response
) {
  const id = req.id;

  const [userProgress, error] = getOneUserProgress(id!);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!userProgress) {
    sendNotFoundJSON(`cannot find progress for user with id ${id!}`, res);
    return;
  }

  sendOKJSON(
    { user_progress: userProgress },
    "retrieved one user progress successfully",
    res
  );
}
