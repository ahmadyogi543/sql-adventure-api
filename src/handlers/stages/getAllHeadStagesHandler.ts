import { Response, Request } from "express";

import { getAllHeadStages } from "@/models/stages";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getAllHeadStagesHandler(_: Request, res: Response) {
  const [headStages, error] = getAllHeadStages();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON(
    { head_stages: headStages },
    "retrieved all head stages successfully",
    res
  );
}
