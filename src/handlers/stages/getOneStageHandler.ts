import { Response, Request } from "express";

import { getOneStage } from "@/models/stages";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
  validateIdParam,
} from "@/helpers";

type Params = {
  id: string | undefined;
};

export function getOneStageHandler(req: Request<Params>, res: Response) {
  const [id, valid, message] = validateIdParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const [stage, error] = getOneStage(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!stage) {
    sendNotFoundJSON(`cannot find stage with id ${id}`, res);
    return;
  }

  sendOKJSON({ stage: stage }, "retrieved one stage successfully", res);
}
