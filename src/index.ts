import express from "express";
import morgan from "morgan";

import { config } from "./config";
import { homeRouter } from "@/routes/home";
import { notFoundHandler } from "@/handlers/utils";
import { stagesRouter } from "@/routes/stages";

const { HOSTNAME, PORT } = config;
const app = express();

// logger setup
morgan.format(
  "custom",
  "=> server: :method :url :status :res[content-length] - :response-time ms"
);
app.use(morgan("custom"));

// middlewares
app.use(express.json());

// routes
app.use("/", homeRouter);
app.use("/stages", stagesRouter);

// for every other routes, send not found
app.all("/*", notFoundHandler);

app.listen(PORT, HOSTNAME, () => {
  console.log(`=> server: listening at http://${HOSTNAME}:${PORT}`);
});
