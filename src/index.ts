import express from "express";
import morgan from "morgan";

import { config } from "./config";
import { constants } from "./constants";
import { homeRouter } from "@/routes/home";
import { notFoundHandler } from "@/handlers/utils";
import { stagesRouter } from "@/routes/stages";

const { LOGGER_FORMAT } = constants;
const { HOSTNAME, PORT } = config;

const app = express();

// logger setup
morgan.format("custom", LOGGER_FORMAT);

// middlewares
app.use(express.json());
app.use(morgan("custom"));

// routes
app.use("/", homeRouter);
app.use("/stages", stagesRouter);

// for every other routes, send not found
app.all("/*", notFoundHandler);

app.listen(PORT, HOSTNAME, () => {
  console.log(`=> server: listening at http://${HOSTNAME}:${PORT}`);
});
