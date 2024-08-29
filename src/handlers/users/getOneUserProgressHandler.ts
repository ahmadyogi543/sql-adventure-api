import { Response, Request } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

export function getOneUserProgressHandler(_: Request, res: Response) {
  sendOKJSON(null, "retrieved one user progress successfully", res);
}
