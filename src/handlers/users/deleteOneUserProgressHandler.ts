import { Request, Response } from "express";

import { deleteOneUserProgress } from "@/models/users-progress";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  sendNotFoundJSON,
} from "@/helpers";

interface DeleteOneUserProgressRequest extends Request {
  id?: number;
}

export function deleteOneUserProgressHandler(
  req: DeleteOneUserProgressRequest,
  res: Response
) {
  const userId = req.id as number;

  const [success, error] = deleteOneUserProgress(userId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!success) {
    sendNotFoundJSON(
      `progress for user with id ${userId} does not exists`,
      res
    );
    return;
  }

  sendNoContentJSON(res);
}
