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
