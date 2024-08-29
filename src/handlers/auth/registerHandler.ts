import { Request, Response } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

type RegisterBody = {
  username: string;
  password: string;
};

export function registerHandler(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  sendOKJSON(null, "TODO: implement register handler", res);
}
