import { Router } from "express";

import { admin } from "@/middlewares/admin";
import {
  attemptOneMissionHandler,
  attemptOneStageHandler,
  deleteOneUserProgressHandler,
  getAllUsersHandler,
  getAllUsersProgressHandler,
  getOneUserHandler,
  getOneUserProgressHandler,
} from "@/handlers/users";
import { user } from "@/middlewares/user";

export const usersRouter = Router();

// get all users
usersRouter.get("/", admin, getAllUsersHandler);

// get all users progress
usersRouter.get("/progress", admin, getAllUsersProgressHandler);

// get one user with id
usersRouter.get("/:id", user, getOneUserHandler);

// add one user progress with id (i.e initializing progress)
usersRouter.post("/progress/:id", user, attemptOneStageHandler);

// get one user progress with id
usersRouter.get("/progress/:id", user, getOneUserProgressHandler);

// delete one users progress with id (i.e reset the progress)
usersRouter.delete("/progress/:id", user, deleteOneUserProgressHandler);

// attempt one mission on user progress with id
usersRouter.post(
  "/progress/:id/attempt_mission",
  user,
  attemptOneMissionHandler
);
