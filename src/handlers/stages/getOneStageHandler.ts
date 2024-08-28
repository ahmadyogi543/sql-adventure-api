import { Response, Request } from "express";

import { sendBadRequestJSON } from "@/helpers/responseSender";
import { validateIdParam } from "@/helpers/validator";

type Params = {
  id: string;
};

export function getOneStageHandler(
  req: Request<Params, {}, {}>,
  res: Response
) {
  const id = parseInt(req.params.id);

  const [valid, message] = validateIdParam(id);
  if (!valid) {
    sendBadRequestJSON(message, res);
    return;
  }

  res.json({
    message: "TODO: implement to get one stage data",
  });
}
