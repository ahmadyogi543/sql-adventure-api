import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./config";
import { constants } from "./constants";
import { homeRouter } from "@/routes/home";
import { notFoundHandler } from "@/handlers/utils";
import { stagesRouter } from "@/routes/stages";
import { usersRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import { authenticateToken } from "./middlewares/authenticate";

const { LOGGER_FORMAT } = constants;
const { HOSTNAME, PORT } = config;

const app = express();

// logger setup
morgan.format("custom", LOGGER_FORMAT);

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("custom"));
app.use(express.json());

// routes
app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/stages", authenticateToken, stagesRouter);
app.use("/users", authenticateToken, usersRouter);

// for every other routes, send not found
app.all("/*", notFoundHandler);

app.listen(PORT, HOSTNAME, () => {
  console.log(`=> server: listening at http://${HOSTNAME}:${PORT}`);
});
