import { Request, Response } from "express";

import { sendOKJSON } from "@/helpers";

export function attemptOneMissionHandler(req: Request, res: Response) {
  sendOKJSON(null, "TODO: implementing this handler", res);
}
