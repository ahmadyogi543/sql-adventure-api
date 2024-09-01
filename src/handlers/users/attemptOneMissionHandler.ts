import { Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateIdParam,
} from "@/helpers";
import { getOneUserProgress } from "@/models/users-progress/getOneUserProgress";
import { MissionAttempted } from "@/models/missions-attempted/types";
import { UserProgress } from "@/models/users-progress/types";
import {
  addOneMissionAttempted,
  addOneMissionAttemptedScore,
  getOneMissionAttempted,
  updateOneMissionAttempted,
} from "@/models/missions-attempted";

type AttemptOneMissionBody = {
  stage_id?: string;
  mission_id?: string;
  score?: string;
};

interface AttemptOneMissionRequest
  extends Request<{}, {}, AttemptOneMissionBody> {
  id?: number;
}

export function attemptOneMissionHandler(
  req: AttemptOneMissionRequest,
  res: Response
) {
  const userId = req.id as number;
  let stageId: number;
  let missionId: number;
  let score: number;

  let valid: boolean;
  let message: string;
  [stageId, valid, message] = validateIdParam(req.body.stage_id);
  if (!valid) {
    sendBadRequestJSON(`stage_id: ${message}`, res);
    return;
  }
  [missionId, valid, message] = validateIdParam(req.body.mission_id);
  if (!valid) {
    sendBadRequestJSON(`mission_id: ${message}`, res);
    return;
  }
  [score, valid, message] = validateIdParam(req.body.score);
  if (!valid) {
    sendBadRequestJSON(`score: ${message}`, res);
    return;
  }

  let userProgress: UserProgress | undefined;
  let missionAttempted: MissionAttempted | undefined;
  let error: Error | undefined;
  [userProgress, error] = getOneUserProgress(userId, stageId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!userProgress) {
    sendBadRequestJSON("user_id or stage_id is not valid", res);
    return;
  }
  const userProgressId = userProgress.id;

  let missionAttemptedId: number;
  [missionAttempted, error] = getOneMissionAttempted(userProgressId, missionId);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!missionAttempted) {
    const [id, success, error] = addOneMissionAttempted(
      userProgressId,
      missionId
    );
    if (error) {
      sendInternalServerErrorJSON(error, res);
      return;
    }
    if (!success) {
      sendBadRequestJSON("mission_id is not valid", res);
      return;
    }

    missionAttemptedId = id as number;
  } else {
    const [success, error] = updateOneMissionAttempted(
      userProgress.id,
      missionId,
      missionAttempted.attempt + 1
    );
    if (error) {
      sendInternalServerErrorJSON(error, res);
      return;
    }
    if (!success) {
      sendBadRequestJSON("mission_id is not valid", res);
      return;
    }

    missionAttemptedId = missionAttempted.id;
  }

  let success: boolean;
  [success, error] = addOneMissionAttemptedScore(missionAttemptedId, score);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!success) {
    sendBadRequestJSON("score is not valid", res);
    return;
  }

  sendNoContentJSON(res);
}
