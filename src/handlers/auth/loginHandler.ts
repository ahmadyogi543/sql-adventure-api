import { Request, Response } from "express";

import { getOneUserByEmail } from "@/models/users";
import {
  isPasswordMatch,
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendOKJSON,
  signJWT,
  validateLoginBody,
} from "@/helpers";

type Body = {
  email: string | undefined;
  password: string | undefined;
};

export function loginHandler(req: Request<{}, {}, Body>, res: Response) {
  const [email, password, valid, message] = validateLoginBody(
    req.body.email,
    req.body.password
  );
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const [user, error] = getOneUserByEmail(email);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!user || !isPasswordMatch(password, user.passwordHash)) {
    sendBadRequestJSON(`the username or password is not correct`, res);
    return;
  }

  const token = signJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  sendOKJSON({ token: token }, "login successfully", res);
}
