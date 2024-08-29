import { Response, Request } from "express";

import { getOneUser } from "@/models/users";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers/responseSender";
import { validateIdParam } from "@/helpers/validator";

type GetOneUserParams = {
  id: string;
};

export function getOneUserHandler(
  req: Request<GetOneUserParams, {}, {}>,
  res: Response
) {
  const id = parseInt(req.params.id);

  const [valid, message] = validateIdParam(id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const result = getOneUser(id);
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  if (!result.user) {
    sendNotFoundJSON(`cannot find user with id ${id}`, res);
    return;
  }

  sendOKJSON({ user: result.user }, "retrieved one user successfully", res);
}
