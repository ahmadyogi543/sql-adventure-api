import { Request, Response } from "express";

import { addOneUser, getOneUserByUsername } from "@/models/users";
import { AddOneUserResult, GetOneUserResult } from "@/models/users/types";
import {
  sendBadRequestJSON,
  sendCreatedJSON,
  sendInternalServerErrorJSON,
} from "@/helpers/responseSender";
import { validateRegisterBody } from "@/helpers/validator";

type RegisterBody = {
  username: string | undefined;
  password: string | undefined;
};

export function registerHandler(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  const { username, password } = req.body;

  const [valid, message] = validateRegisterBody(username, password);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  let result: GetOneUserResult | AddOneUserResult;

  result = getOneUserByUsername(username!);
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  if (result.user) {
    sendBadRequestJSON(
      `the user with username ${username} is already exists`,
      res
    );
    return;
  }

  result = addOneUser(username!, password!);
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  sendCreatedJSON(
    result.user,
    `registered user with id ${username} successfully`,
    res
  );
}
