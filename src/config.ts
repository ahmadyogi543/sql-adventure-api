import dotenv from "dotenv";

import { constants } from "@/constants";

const { DB_PATH_LOCAL, DB_PATH_PROD, ENV_LOCAL, ENV_PROD } = constants;
const NODE_ENV = process.env.NODE_ENV || "development";

let DB_PATH: string;
if (NODE_ENV !== "production") {
  dotenv.config({
    path: ENV_LOCAL,
  });
  DB_PATH = DB_PATH_LOCAL;
} else {
  dotenv.config({
    path: ENV_PROD,
  });
  DB_PATH = DB_PATH_PROD;
}

export const config = {
  DB_PATH: `${DB_PATH}/${process.env.DB_NAME}`,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  PASS_AUTH: process.env.PASS_AUTH as "true" | "false",
  HOSTNAME: process.env.HOSTNAME || "localhost",
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
};
