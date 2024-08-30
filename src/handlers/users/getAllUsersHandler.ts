import { Response, Request } from "express";

import { getAllUsers } from "@/models/users";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllUsersHandler(_: Request, res: Response) {
  const [users, error] = getAllUsers();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON({ users: users }, "retrieved all users successfully", res);
}
