import { Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateIdParam,
} from "@/helpers";
import { updateOneUserProgress } from "@/models/users-progress";

type UpdateOneUserProgressBody = {
  stage_id?: string;
  no_of_missions?: string;
};

interface UpdateOneUserProgressRequest
  extends Request<{}, {}, UpdateOneUserProgressBody> {
  id?: number;
}

export function updateOneUserProgressHandler(
  req: UpdateOneUserProgressRequest,
  res: Response
) {
  const userId = req.id as number;
  const [stageId, valid, message] = validateIdParam(req.body.stage_id);
  if (!valid) {
    sendBadRequestJSON(`stage_id: ${message}`, res);
    return;
  }

  const [success, error] = updateOneUserProgress(userId, stageId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!success) {
    sendBadRequestJSON("failed to update one user progress", res);
    return;
  }

  sendNoContentJSON(res);
}
