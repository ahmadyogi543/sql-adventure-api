import { Request as ExpressRequest, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateIDParam,
  validateNumber,
} from "@/helpers";
import {
  addOneUserProgress,
  getOneUserProgress,
  updateOneUserProgress,
} from "@/models/users-progress";

type Body = {
  stage_id?: string;
  no_of_missions?: string;
  score?: string;
};

interface Request extends ExpressRequest<{}, {}, Body> {
  id?: number;
}

export function attemptOneStageHandler(req: Request, res: Response) {
  const userId = req.id as number;

  let valid: boolean;
  let message: string;

  let stageId: number;
  [stageId, valid, message] = validateIDParam(req.body.stage_id);
  if (!valid) {
    sendBadRequestJSON(`stage_id: ${message}`, res);
    return;
  }

  let noOfMissions: number;
  [noOfMissions, valid, message] = validateIDParam(req.body.no_of_missions);
  if (!valid) {
    sendBadRequestJSON(`no_of_missions: ${message}`, res);
    return;
  }

  let score: number;
  [score, valid, message] = validateNumber(req.body.score);
  if (!valid) {
    sendBadRequestJSON(`score: ${message}`, res);
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
    const [success, error] = updateOneUserProgress(userId, stageId, score);
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
