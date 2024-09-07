import { Request, Response } from "express";

import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";
import { getStageDataJSON } from "@/models/utils/getStageDataJSON";

interface GetStageJSONRequest extends Request {
  id?: number;
}

export function getStageDataJSONHandler(
  req: GetStageJSONRequest,
  res: Response
) {
  const id = req.id as number;

  const [data, error] = getStageDataJSON(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON(
    {
      stage_data: data.map((d) => ({
        ...d,
        unlock: d.unlock ? true : false,
      })),
    },
    "retrieved stage data successfully",
    res
  );
}
