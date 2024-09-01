import { Response, Request } from "express";

import { getAllStagesJSON } from "@/models/stages";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllStagesHandler(_: Request, res: Response) {
  const [stages, error] = getAllStagesJSON();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON({ stages: stages }, "retrieved all stages successfully", res);
}
