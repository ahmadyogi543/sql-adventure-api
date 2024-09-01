import { Response, Request } from "express";

import { getOneUser } from "@/models/users";
import {
  getUserJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers";

interface GetOneUserRequest extends Request {
  id: number;
}

export function getOneUserHandler(req: GetOneUserRequest, res: Response) {
  const id = req.id;

  const [user, error] = getOneUser(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!user) {
    sendNotFoundJSON(`cannot find user with id ${id}`, res);
    return;
  }

  sendOKJSON(
    { user: getUserJSON(user) },
    "retrieved one user successfully",
    res
  );
}
