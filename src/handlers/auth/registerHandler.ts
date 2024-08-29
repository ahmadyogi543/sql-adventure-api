import { Request, Response } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

export function registerHandler(req: Request, res: Response) {
  sendOKJSON(null, "TODO: implement register handler", res);
}
