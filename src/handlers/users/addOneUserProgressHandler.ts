import { Request as ExpressRequest, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateNumberParam,
} from "@/helpers";
import {
  addOneUserProgress,
  getOneUserProgress,
} from "@/models/users-progress";
import { UserProgress } from "@/models/users-progress/types";

type Body = {
  stage_id?: string;
  no_of_missions?: string;
};

interface Request extends ExpressRequest<{}, {}, Body> {
  id?: number;
}

export function addOneUserProgressHandler(req: Request, res: Response) {
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

  let error: Error | undefined;
  let userProgress: UserProgress | undefined;
  let success: boolean;

  [userProgress, error] = getOneUserProgress(userId, stageId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (userProgress) {
    sendBadRequestJSON(
      `user progress for stage with id ${stageId} is already exists`,
      res
    );
    return;
  }

  [success, error] = addOneUserProgress(userId, stageId, noOfMissions);
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
