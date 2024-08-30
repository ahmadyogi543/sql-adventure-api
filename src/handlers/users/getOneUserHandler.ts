import { Response, Request } from "express";

import { getOneUser } from "@/models/users";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
  validateIdParam,
} from "@/helpers";

type GetOneUserParams = {
  id: string | undefined;
};

export function getOneUserHandler(
  req: Request<GetOneUserParams, {}, {}>,
  res: Response
) {
  const [id, valid, message] = validateIdParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const [user, error] = getOneUser(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!user) {
    sendNotFoundJSON(`cannot find user with id ${id}`, res);
    return;
  }

  sendOKJSON({ user: user }, "retrieved one user successfully", res);
}
