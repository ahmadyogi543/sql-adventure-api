import { Request, Response } from "express";

import { addOneUser, getOneUserByUsername } from "@/models/users";
import {
  getUserJSON,
  sendBadRequestJSON,
  sendCreatedJSON,
  sendInternalServerErrorJSON,
  validateUsernameAndPassword,
} from "@/helpers";

type Body = {
  username: string | undefined;
  password: string | undefined;
};

export function registerHandler(req: Request<{}, {}, Body>, res: Response) {
  const [username, password, valid, message] = validateUsernameAndPassword(
    req.body.username,
    req.body.password
  );
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  let [user, error] = getOneUserByUsername(username);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }
  if (user) {
    sendBadRequestJSON(
      `the user with username ${username} is already exists`,
      res
    );
    return;
  }

  [user, error] = addOneUser(username, password);
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
    `registered user with id ${username} successfully`,
    res
  );
}
