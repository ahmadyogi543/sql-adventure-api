import { Request, Response } from "express";

import { addOneBannedToken } from "@/models/tokens";
import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateJWT,
  verifyJWT,
} from "@/helpers";

type Body = {
  token: string | undefined;
};

export function logoutHandler(req: Request<{}, {}, Body>, res: Response) {
  const [token, valid, message] = validateJWT(req.body.token);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  verifyJWT(
    token,
    (message) => sendForbiddenJSON(message, res),
    (message) => sendForbiddenJSON(message, res),
    (user) => {
      const [error] = addOneBannedToken(token, user.exp);
      if (error) {
        sendInternalServerErrorJSON(error, res);
        return;
      }

      sendNoContentJSON(res);
    }
  );
}
