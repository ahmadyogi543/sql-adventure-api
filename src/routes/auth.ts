import { Router } from "express";

import { loginHandler, registerHandler } from "@/handlers/auth";

export const authRouter = Router();

// log the user in
authRouter.post("/login", loginHandler);

// register the user
authRouter.post("/register", registerHandler);
