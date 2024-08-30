import { Request, Response } from "express";

import { addOneBannedToken, findOneBannedToken } from "@/models/tokens";
import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  sendNoContentJSON,
  validateJWT,
  verifyJWT,
} from "@/helpers";

export function logoutHandler(req: Request, res: Response) {
  const [token, valid, message] = validateJWT(
    req.header("Authorization")?.split(" ")[1]
  );
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  verifyJWT(
    token,
    (message) => sendForbiddenJSON(message, res),
    (message) => sendForbiddenJSON(message, res),
    (user) => {
      // check if token is banned
      let [found, error] = findOneBannedToken(token);
      if (error) {
        sendInternalServerErrorJSON(error, res);
        return;
      }
      if (found) {
        sendForbiddenJSON("bad credentials, token is invalid", res);
        return;
      }

      // banned the token
      [error] = addOneBannedToken(token, user.exp);
      if (error) {
        sendInternalServerErrorJSON(error, res);
        return;
      }

      sendNoContentJSON(res);
    }
  );
}
