import { Router } from "express";

import { admin } from "@/middlewares/admin";
import { getDashboardDataJSONHandler } from "@/handlers/utils/getDashboardData";

export const adminRouter = Router();

// get all users
adminRouter.get("/dashboard", admin, getDashboardDataJSONHandler);
