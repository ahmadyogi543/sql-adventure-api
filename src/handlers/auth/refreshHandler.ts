import { Request, Response } from "express";

import { deleteOneRefreshToken, getOneRefreshToken } from "@/models/users";
import {
  sendBadRequestJSON,
  sendForbiddenJSON,
  sendInternalServerErrorJSON,
  sendOKJSON,
} from "@/helpers/responseSender";
import { validateJWT } from "@/helpers/validator";
import { verifyJWT } from "@/helpers/verifyJWT";

type Body = {
  token: string | undefined;
};

export function refreshHandler(req: Request<{}, {}, Body>, res: Response) {
  const [token, valid, message] = validateJWT(req.body.token);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const { refreshToken, error } = getOneRefreshToken(token);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!refreshToken) {
    sendForbiddenJSON("invalid credentials, refresh token is not correct", res);
    return;
  }

  verifyJWT(
    token,
    (message) => {
      const { error } = deleteOneRefreshToken(refreshToken.userId);
      if (error) {
        sendInternalServerErrorJSON(error, res);
        return;
      }

      sendForbiddenJSON(message, res);
    },
    (message) => sendForbiddenJSON(message, res),
    (token) =>
      sendOKJSON(
        { access_token: token },
        "refresh access token successfully",
        res
      )
  );
}
