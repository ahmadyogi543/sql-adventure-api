import {
  getStageDataJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers";
import { getAllUsersProgressJSON } from "@/models/users-progress";
import { Request, Response } from "express";

interface GetStageJSONRequest extends Request {
  id?: number;
}

export function getStageDataJSONHandler(
  req: GetStageJSONRequest,
  res: Response
) {
  const id = req.id as number;
  const [usersProgress, error] = getAllUsersProgressJSON();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  const userProgress = usersProgress.find((up) => up.user_id === id);
  if (!userProgress) {
    sendNotFoundJSON(`failed to find stage data for user with id ${id}`, res);
    return;
  }

  const stageData = getStageDataJSON(userProgress);
  sendOKJSON(
    { stage_data: stageData },
    "retrieved stage data successfully",
    res
  );
}
