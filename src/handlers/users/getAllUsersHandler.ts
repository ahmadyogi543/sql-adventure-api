import { Response, Request } from "express";

import { getAllUsers } from "@/models/users/getAllUsers";
import {
  sendInternalServerErrorJSON,
  sendOKJSON,
} from "@/helpers/responseSender";

export function getAllUsersHandler(_: Request, res: Response) {
  const result = getAllUsers();
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  sendOKJSON({ users: result.users }, "retrieved all users successfully", res);
}
