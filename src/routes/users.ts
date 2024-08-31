import { Router } from "express";

import { admin } from "@/middlewares/admin";
import {
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

// get one users with id
usersRouter.get("/:id", user, getOneUserHandler);

// get one users progress with id
usersRouter.get("/progress/:id", user, getOneUserProgressHandler);
