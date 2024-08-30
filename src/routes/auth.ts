import { Router } from "express";

import { loginHandler, logoutHandler, registerHandler } from "@/handlers/auth";

export const authRouter = Router();

// log the user in
authRouter.post("/login", loginHandler);

// log the user out
authRouter.post("/logout", logoutHandler);

// register the user
authRouter.post("/register", registerHandler);
