import { Response, Request } from "express";

import { getOneUserProgressJSON } from "@/models/users-progress";
import {
  sendInternalServerErrorJSON,
  sendNotFoundJSON,
  sendOKJSON,
} from "@/helpers";

interface GetOneProgressRequest extends Request {
  id: number;
}

export function getOneUserProgressHandler(
  req: GetOneProgressRequest,
  res: Response
) {
  const id = req.id;

  const [userProgress, error] = getOneUserProgressJSON(id);
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  if (!userProgress) {
    sendNotFoundJSON(`cannot find progress of user with id ${id}`, res);
    return;
  }

  sendOKJSON(
    { user_progress: userProgress },
    "retrieved one user progress successfully",
    res
  );
}
