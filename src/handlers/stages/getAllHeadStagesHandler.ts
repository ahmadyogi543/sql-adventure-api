import { Response, Request } from "express";

import { getAllHeadStages } from "@/models/stages";
import {
  sendInternalServerErrorJSON,
  sendOKJSON,
} from "@/helpers/responseSender";

export function getAllHeadStagesHandler(_: Request, res: Response) {
  const result = getAllHeadStages();
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  sendOKJSON(
    { head_stages: result.headStages },
    "retrieved all head stages successfully",
    res
  );
}
