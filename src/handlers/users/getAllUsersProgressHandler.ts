import { Response, Request } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

export function getAllUsersProgressHandler(_: Request, res: Response) {
  sendOKJSON(null, "retrieved all users progress successfully", res);
}
