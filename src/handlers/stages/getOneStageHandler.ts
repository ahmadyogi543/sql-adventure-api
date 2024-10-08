import { Response, Request } from "express";

import { getOneStageJSON } from "@/models/stages";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
  validateIDParam,
} from "@/helpers";

type Params = {
  id: string | undefined;
};

export function getOneStageHandler(req: Request<Params>, res: Response) {
  const [id, valid, message] = validateIDParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const [stage, error] = getOneStageJSON(id);
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
