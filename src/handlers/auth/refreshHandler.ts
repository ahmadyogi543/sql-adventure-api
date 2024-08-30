import { Request, Response } from "express";

import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  sendOKJSON,
} from "@/helpers/responseSender";
import { validateJWT } from "@/helpers/validator";
import { verifyJWT } from "@/helpers/verifyJWT";

type Body = {
  refresh_token: string | undefined;
};

export function refreshHandler(req: Request<{}, {}, Body>, res: Response) {
  const { refresh_token } = req.body;

  const [valid, message] = validateJWT(refresh_token);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  // TODO: implement to check if refresh token are in storage

  verifyJWT(
    refresh_token!,
    (message) => sendForbiddenJSON(message, res),
    (message) => sendForbiddenJSON(message, res),
    (token) =>
      sendOKJSON(
        { access_token: token },
        "refresh access token successfully",
        res
      )
  );
}
