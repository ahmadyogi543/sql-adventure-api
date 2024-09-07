import { Response, Request } from "express";

import { deleteOneUser, getOneUser } from "@/models/users";
import {
  getUserJSON,
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  sendNotFoundJSON,
  sendOKJSON,
  validateNumberParam,
} from "@/helpers";
import { User } from "@/models/users/types";

type Params = {
  id: string;
};

export function deleteOneUserHandler(
  req: Request<Params, {}, {}>,
  res: Response
) {
  const [id, valid, message] = validateNumberParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  let error: Error | undefined;

  let user: User | undefined;
  [user, error] = getOneUser(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!user) {
    sendNotFoundJSON(`cannot find user with id ${id}`, res);
    return;
  }

  let success: boolean;
  [success, error] = deleteOneUser(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!success) {
    sendNotFoundJSON(`cannot find user with id ${id}`, res);
    return;
  }

  sendNoContentJSON(res);
}
