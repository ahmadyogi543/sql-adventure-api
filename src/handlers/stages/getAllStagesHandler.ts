import { Response, Request } from "express";

import { getAllStages } from "@/models/stages/getAllStages";
import {
  sendInternalServerErrorJSON,
  sendOKJSON,
} from "@/helpers/responseSender";

export function getAllStagesHandler(_: Request, res: Response) {
  const result = getAllStages();
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  sendOKJSON(
    { stages: result.stages },
    "retrieved all stages successfully",
    res
  );
}
