import { Router } from "express";

import {
  addOneUserProgressHandler,
  attemptOneMissionHandler,
  deleteOneUserProgressHandler,
  getAllUsersHandler,
  getAllUsersProgressHandler,
  getOneUserHandler,
  getOneUserProgressHandler,
  updateOneUserProgressHandler,
} from "@/handlers/users";
import { admin } from "@/middlewares/admin";
import { user } from "@/middlewares/user";

export const usersRouter = Router();

// get all users
usersRouter.get("/", admin, getAllUsersHandler);

// get all users progress
usersRouter.get("/progress", admin, getAllUsersProgressHandler);

// get one user with id
usersRouter.get("/:id", user, getOneUserHandler);

// add one user progress with id (i.e initializing the progress)
usersRouter.post("/progress/:id", user, addOneUserProgressHandler);

// get one user progress with id
usersRouter.get("/progress/:id", user, getOneUserProgressHandler);

// update on user progress with id (i.e updating the last_attempted)
usersRouter.put("/progress/:id", user, updateOneUserProgressHandler);

// delete one users progress with id (i.e reset the progress)
usersRouter.delete("/progress/:id", user, deleteOneUserProgressHandler);

// attempt one mission on user progress with id (i.e put attempted mission data)
usersRouter.post("/progress/:id/attempt", user, attemptOneMissionHandler);
