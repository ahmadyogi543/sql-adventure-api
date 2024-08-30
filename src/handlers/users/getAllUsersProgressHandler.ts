import { Response, Request } from "express";

import { getAllUsersProgress } from "@/models/users";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllUsersProgressHandler(_: Request, res: Response) {
  const [usersProgress, error] = getAllUsersProgress();
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
