import { Router } from "express";

import {
  getAllUsersHandler,
  getAllUsersProgressHandler,
  getOneUserHandler,
  getOneUserProgressHandler,
} from "@/handlers/users";

export const usersRouter = Router();

// get all users
usersRouter.get("/", getAllUsersHandler);

// get all users progress
usersRouter.get("/progress", getAllUsersProgressHandler);

// get one users with id
usersRouter.get("/:id", getOneUserHandler);

// get one users progress with id
usersRouter.get("/progress/:userId", getOneUserProgressHandler);
