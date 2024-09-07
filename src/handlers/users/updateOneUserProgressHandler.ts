import { Request as ExpressRequest, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateIDParam,
} from "@/helpers";
import {
  getOneUserProgress,
  updateOneUserProgress,
} from "@/models/users-progress";
import { UserProgress } from "@/models/users-progress/types";

type Body = {
  stage_id?: string;
  score?: string;
};

interface Request extends ExpressRequest<{}, {}, Body> {
  id?: number;
}

export function updateOneUserProgressHandler(req: Request, res: Response) {
  const userId = req.id as number;

  let valid: boolean;
  let message: string;

  let stageId: number;
  [stageId, valid, message] = validateIDParam(req.body.stage_id);
  if (!valid) {
    sendBadRequestJSON(`stage_id: ${message}`, res);
    return;
  }

  let score: number;
  [score, valid, message] = validateIDParam(req.body.score);
  if (!valid) {
    sendBadRequestJSON(`score: ${message}`, res);
    return;
  }

  let error: Error | undefined;
  let userProgress: UserProgress | undefined;
  let success: boolean;

  [userProgress, error] = getOneUserProgress(userId, stageId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!userProgress) {
    sendBadRequestJSON(
      `user progress for stage with id ${stageId} doest not exists`,
      res
    );
  }

  [success, error] = updateOneUserProgress(userId, stageId, score);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!success) {
    sendBadRequestJSON("failed to update user progress", res);
    return;
  }

  sendNoContentJSON(res);
}
