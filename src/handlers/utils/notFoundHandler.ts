import { Request, Response } from "express";

import { sendNotFoundJSON } from "@/helpers";

export function notFoundHandler(_: Request, res: Response) {
  sendNotFoundJSON("not found", res);
}
