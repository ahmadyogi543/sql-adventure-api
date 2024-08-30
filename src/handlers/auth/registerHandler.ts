import { Request, Response } from "express";

import { addOneUser, getOneUserByUsername } from "@/models/users";
import { User } from "@/models";
import {
  sendBadRequestJSON,
  sendCreatedJSON,
  sendInternalServerErrorJSON,
  validateUsernameAndPassword,
} from "@/helpers";

type RegisterBody = {
  username: string | undefined;
  password: string | undefined;
};

export function registerHandler(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  const [username, password, valid, message] = validateUsernameAndPassword(
    req.body.username,
    req.body.password
  );
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  let user: User | undefined;
  let error: Error | undefined;

  [user, error] = getOneUserByUsername(username);
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

  sendCreatedJSON(
    {
      user: {
        id: user!.id,
        username: user!.username,
      },
    },
    `registered user with id ${username} successfully`,
    res
  );
}
