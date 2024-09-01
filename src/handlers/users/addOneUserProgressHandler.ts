import { Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateIdParam,
} from "@/helpers";
import { addOneUserProgress } from "@/models/users-progress";

type AddOneUserProgressBody = {
  stage_id?: string;
  no_of_missions?: string;
};

interface AddOneUserProgressRequest
  extends Request<{}, {}, AddOneUserProgressBody> {
  id?: number;
}

export function addOneUserProgressHandler(
  req: AddOneUserProgressRequest,
  res: Response
) {
  const userId = req.id as number;
  let stageId: number;
  let noOfMissions: number;
  let valid: boolean;
  let message: string;

  [stageId, valid, message] = validateIdParam(req.body.stage_id);
  if (!valid) {
    sendBadRequestJSON(`stage_id: ${message}`, res);
    return;
  }

  [noOfMissions, valid, message] = validateIdParam(req.body.no_of_missions);
  if (!valid) {
    sendBadRequestJSON(`no_of_missions: ${message}`, res);
    return;
  }

  const [success, error] = addOneUserProgress(userId, 0, 0);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!success) {
    sendBadRequestJSON("failed to add user progress", res);
    return;
  }

  sendNoContentJSON(res);
}
