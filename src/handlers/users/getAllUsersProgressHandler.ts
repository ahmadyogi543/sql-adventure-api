import { Response, Request } from "express";

import { getJSONAllUsersProgress } from "@/models/users-progress";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllUsersProgressHandler(_: Request, res: Response) {
  const [usersProgress, error] = getJSONAllUsersProgress();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON(
    { users_progress: usersProgress },
    "retrieved all users progress successfully",
    res
  );
}
