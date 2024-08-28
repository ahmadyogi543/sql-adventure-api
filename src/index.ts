import express from "express";

import { homeRouter } from "@/routes/home";
import { stagesRouter } from "@/routes/stages";

import { notFoundHandler } from "@/handlers/utils";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/", homeRouter);
app.use("/stages", stagesRouter);

app.all("/*", notFoundHandler);

// start the server
app.listen(5000, "localhost", () => {
  console.log("server: listening at http://localhost:5000");
});
