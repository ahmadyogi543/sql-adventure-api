import { Request, Response } from "express";

import { getOneUserByUsername } from "@/models/users";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendOKJSON,
} from "@/helpers/responseSender";
import { isPasswordMatch } from "@/helpers/isPasswordMatch";
import { signJWT } from "@/helpers/signJWT";
import { validateUsernameAndPassword } from "@/helpers/validator";

type Body = {
  username: string | undefined;
  password: string | undefined;
};

export function loginHandler(req: Request<{}, {}, Body>, res: Response) {
  const { username, password } = req.body;

  const [valid, message] = validateUsernameAndPassword(username, password);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const result = getOneUserByUsername(username!);
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  if (!result.user) {
    sendBadRequestJSON(`the username or password is not correct`, res);
    return;
  }

  if (!isPasswordMatch(password!, result.user.password_hash)) {
    sendBadRequestJSON(`the username or password is not correct`, res);
    return;
  }

  const tokens = signJWT({
    id: result.user.id,
    username: result.user.username,
  });

  // TODO: store refresh token to persistent storage

  sendOKJSON(
    {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    },
    "login successfully",
    res
  );
}
