import { Request, Response } from "express";

import { sendNotFoundJSON } from "../../helpers/responseSender";

export function notFoundHandler(_: Request, res: Response) {
  sendNotFoundJSON("not found", res);
}
