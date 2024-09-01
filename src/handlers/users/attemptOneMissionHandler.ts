import { Request, Response } from "express";

import { sendOKJSON } from "@/helpers";
/*
  1) retrieve the users_progress with userId and stageId
  to get the id of users_progress

  2) check if the missions_attempted table exists
  with userProgressId and missionId

  3) if not, then insert missions_attempted table with
  usersProgressId and missionId, attempt to 1
  and last_attempted to now (new Date) get the last
  inserted row id

  4) if exist, retrieve it, use id and attempt value
  then continue update the attempt (increment)
  and last_attempted with now

  5) use the id of inserted missions_attempted table
  to insert new record to mission_attempted_scores
  with the score
  */
export function attemptOneMissionHandler(req: Request, res: Response) {
  sendOKJSON(null, "TODO: implementing this handler", res);
}
