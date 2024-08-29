import dotenv from "dotenv";

import { constants } from "@/constants";

const { ENV_LOCAL, ENV_PROD } = constants;

dotenv.config({
  path: process.env.NODE_ENV !== "production" ? ENV_LOCAL : ENV_PROD,
});

export const config = {
  DB_PATH: `./src/data/bin/${process.env.DB_NAME}`,
  HOSTNAME: process.env.HOSTNAME as string,
  PORT: parseInt(process.env.PORT!),
};
