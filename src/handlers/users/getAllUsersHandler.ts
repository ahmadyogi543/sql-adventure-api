import { Response, Request } from "express";

import { sendOKJSON } from "@/helpers/responseSender";

export function getAllUsersHandler(_: Request, res: Response) {
  sendOKJSON(null, "retrieved all users successfully", res);
}
