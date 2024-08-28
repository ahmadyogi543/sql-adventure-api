import dotenv from "dotenv";

import { constants } from "@/constants";

const { ENV_LOCAL, ENV_PROD } = constants;

dotenv.config({
  path: process.env.NODE_ENV !== "production" ? ENV_LOCAL : ENV_PROD,
});

export const config = {
  HOSTNAME: process.env.HOSTNAME,
  PORT: parseInt(process.env.PORT!),
};
