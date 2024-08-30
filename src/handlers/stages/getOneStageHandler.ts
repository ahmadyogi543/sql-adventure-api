import { Response, Request } from "express";

import { getOneStage } from "@/models/stages";
import {
  sendBadRequestJSON,
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers/responseSender";
import { validateIdParam } from "@/helpers/validator";

type Params = {
  id: string | undefined;
};

export function getOneStageHandler(
  req: Request<Params, {}, {}>,
  res: Response
) {
  const [id, valid, message] = validateIdParam(req.params.id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  const result = getOneStage(id);
  if (result.error) {
    sendInternalServerErrorJSON(result.error, res);
    return;
  }

  if (!result.stage) {
    sendNotFoundJSON(`cannot find stage with id ${id}`, res);
    return;
  }

  sendOKJSON({ stage: result.stage }, "retrieved one stage successfully", res);
}
