import { Router } from "express";

import {
  getAllHeadStagesHandler,
  getAllStagesHandler,
  getOneStageHandler,
} from "@/handlers/stages";

export const stagesRouter = Router();

// get all stages head
stagesRouter.get("/head", getAllHeadStagesHandler);

// get all stages
stagesRouter.get("/", getAllStagesHandler);

// get specific stage with id
stagesRouter.get("/:id", getOneStageHandler);
