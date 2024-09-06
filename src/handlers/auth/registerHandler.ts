import { Request, Response } from "express";

import { addOneUser, getOneUserByEmail } from "@/models/users";
import {
  getUserJSON,
  sendBadRequestJSON,
  sendCreatedJSON,
  sendInternalServerErrorJSON,
  validateRegisterBody,
} from "@/helpers";

type Body = {
  name: string | undefined;
  email: string | undefined;
  institution: string | undefined;
  password: string | undefined;
};

export function registerHandler(req: Request<{}, {}, Body>, res: Response) {
  const [name, email, institution, password, valid, message] =
    validateRegisterBody(
      req.body.name,
      req.body.email,
      req.body.institution,
      req.body.password
    );
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  let [user, error] = getOneUserByEmail(email);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (user) {
    sendBadRequestJSON(`the user with email ${email} is already exists`, res);
    return;
  }

  [user, error] = addOneUser(name, email, institution, password);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (!user) {
    sendBadRequestJSON("failed to register a user", res);
    return;
  }

  sendCreatedJSON(
    { user: getUserJSON(user) },
    `registered user with id ${user.id} successfully`,
    res
  );
}
