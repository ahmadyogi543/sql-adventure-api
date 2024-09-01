import { Response, Request } from "express";

import { getAllUsersProgressJSON } from "@/models/users-progress";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllUsersProgressHandler(_: Request, res: Response) {
  const [usersProgress, error] = getAllUsersProgressJSON();
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
