import express from "express";

import { welcomeHandler } from "../handlers/utils/welcomeHandler";

export const homeRouter = express.Router();

homeRouter.get("/", welcomeHandler);
