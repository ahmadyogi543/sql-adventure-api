import { Response, Request } from "express";

import { getAllStages } from "@/models/stages";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllStagesHandler(_: Request, res: Response) {
  const [stages, error] = getAllStages();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON({ stages: stages }, "retrieved all stages successfully", res);
}
