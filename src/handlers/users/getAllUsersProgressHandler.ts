import { Response, Request } from "express";

import { getAllUsersProgress } from "@/models/users/getAllUsersProgress";
import {
  sendInternalServerErrorJSON,
  sendOKJSON,
} from "@/helpers/responseSender";

export function getAllUsersProgressHandler(_: Request, res: Response) {
  const result = getAllUsersProgress();
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  sendOKJSON(
    { users_progress: result.usersProgress },
    "retrieved all users progress successfully",
    res
  );
}
