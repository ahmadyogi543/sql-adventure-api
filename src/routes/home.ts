import express from "express";

import { welcomeHandler } from "@/handlers/utils/welcomeHandler";
import { testHandler } from "@/handlers/utils/test";

export const homeRouter = express.Router();

homeRouter.get("/", welcomeHandler);
homeRouter.get("/test", testHandler);
