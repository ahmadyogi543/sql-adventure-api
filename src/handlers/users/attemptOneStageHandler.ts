import { Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateNumberParam,
} from "@/helpers";
import {
  addOneUserProgress,
  updateOneUserProgress,
} from "@/models/users-progress";
import { getOneUserProgress } from "@/models/users-progress/getOneUserProgress";

type AttemptOneStageBody = {
  stage_id?: string;
  no_of_missions?: string;
};

interface AttemptOneStageRequest extends Request<{}, {}, AttemptOneStageBody> {
  id?: number;
}

export function attemptOneStageHandler(
  req: AttemptOneStageRequest,
  res: Response
) {
  const userId = req.id as number;
  let stageId: number;
  let noOfMissions: number;
  let valid: boolean;
  let message: string;

  [stageId, valid, message] = validateNumberParam(req.body.stage_id);
  if (!valid) {
    sendBadRequestJSON(`stage_id: ${message}`, res);
    return;
  }

  [noOfMissions, valid, message] = validateNumberParam(req.body.no_of_missions);
  if (!valid) {
    sendBadRequestJSON(`no_of_missions: ${message}`, res);
    return;
  }

  const [userProgress, error] = getOneUserProgress(userId, stageId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!userProgress) {
    const [success, error] = addOneUserProgress(userId, stageId, noOfMissions);
    if (error) {
      sendInternalServerErrorJSON(error, res);
      return;
    }

    if (!success) {
      sendBadRequestJSON("failed to add user progress", res);
      return;
    }
  } else {
    const [success, error] = updateOneUserProgress(userId, stageId);
    if (error) {
      sendInternalServerErrorJSON(error, res);
      return;
    }

    if (!success) {
      sendBadRequestJSON("failed to update user progress", res);
      return;
    }
  }

  sendNoContentJSON(res);
}
