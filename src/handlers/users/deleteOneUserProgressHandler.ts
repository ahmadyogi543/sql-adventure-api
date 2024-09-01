import { Request, Response } from "express";

import { deleteOneUserProgress } from "@/models/users-progress";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
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
    sendBadRequestJSON("failed to delete one user progress", res);
    return;
  }

  sendNoContentJSON(res);
}
