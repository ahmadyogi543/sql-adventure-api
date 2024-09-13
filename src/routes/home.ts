import express from "express";

import { getLeaderBoardJSONHandler } from "@/handlers/utils/getLeaderboardHandler";
import { testHandler } from "@/handlers/utils/test";
import { welcomeHandler } from "@/handlers/utils/welcomeHandler";

export const homeRouter = express.Router();

homeRouter.get("/", welcomeHandler);
homeRouter.get("/test", testHandler);
homeRouter.get("/leaderboard", getLeaderBoardJSONHandler);
