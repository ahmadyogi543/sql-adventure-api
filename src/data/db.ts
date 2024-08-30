import * as fs from "fs";
import * as path from "path";
import Database from "better-sqlite3";

import { constants } from "@/constants";
import { config } from "@/config";
import { deleteAllBannedTokens } from "@/models/tokens";

const { DB_PATH } = config;

// crash the program if the DB_NAME is not set correctly
const { DB_NAMES } = constants;
if (!DB_NAMES.some((name) => DB_PATH.includes(name))) {
  console.error(
    "=> db: incorrect DB_NAME value. Did you put the correct .env?"
  );
  process.exit(1);
}

// mkdir "src/data/bin" directory if not exists
const dirname = path.dirname(DB_PATH);
if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname, { recursive: true });
}

export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

// migrate db to create tables
try {
  const files = ["create_users_table_up.sql", "create_stages_table_up.sql"];
  files.forEach((file) => {
    const query = fs.readFileSync(path.join(__dirname, "migrations", file), {
      encoding: "utf-8",
    });
    db.exec(query);
  });

  console.log("=> db: migration applied successfully");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// remove all banned tokens periodically (1 hour)
const interval = setInterval(() => {
  const [error] = deleteAllBannedTokens();
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log("=> db: all expired banned_tokens is cleaned");
}, 60 * 60 * 1000);

// close the db connection if the program received SIGINT
process.on("SIGINT", () => {
  clearInterval(interval);

  db.close();
  process.exit(0);
});
