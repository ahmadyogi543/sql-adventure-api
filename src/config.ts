import dotenv from "dotenv";

import { constants } from "@/constants";

const { DB_PATH_LOCAL, DB_PATH_PROD, ENV_LOCAL } = constants;
const NODE_ENV = process.env.NODE_ENV || "development";

let DB_PATH: string;
if (NODE_ENV !== "production") {
  dotenv.config({
    path: ENV_LOCAL,
  });
  DB_PATH = DB_PATH_LOCAL;
} else {
  DB_PATH = DB_PATH_PROD;
}

export const config = {
  DB_PATH: `${DB_PATH}/${process.env.DB_NAME}`,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  HOSTNAME: process.env.HOSTNAME as string,
  PORT: parseInt(process.env.PORT!),

  TEST_AUTH: process.env.TEST_AUTH as "true" | "false",
};
