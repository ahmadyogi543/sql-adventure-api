import { Request, Response } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

export function loginHandler(req: Request, res: Response) {
  sendOKJSON(null, "TODO: implement login handler", res);
}
