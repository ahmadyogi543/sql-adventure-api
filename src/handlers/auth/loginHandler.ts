import { Request, Response } from "express";

import { getOneUserByUsername } from "@/models/users";
import {
  isPasswordMatch,
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendOKJSON,
  signJWT,
  validateUsernameAndPassword,
} from "@/helpers";
import { User } from "@/models";

type Body = {
  username: string | undefined;
  password: string | undefined;
};

export function loginHandler(req: Request<{}, {}, Body>, res: Response) {
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

  if (!user || !isPasswordMatch(password, user.password_hash)) {
    sendBadRequestJSON(`the username or password is not correct`, res);
    return;
  }

  const token = signJWT({
    id: user.id,
    username: user.username,
    role: user.role,
  });

  sendOKJSON({ token }, "login successfully", res);
}
