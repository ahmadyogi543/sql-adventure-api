import { Response, Request } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

export function getOneUserHandler(_: Request, res: Response) {
  sendOKJSON(null, "retrieved one user successfully", res);
}
