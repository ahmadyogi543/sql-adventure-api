import * as fs from "fs";
import * as path from "path";
import Database from "better-sqlite3";

import { constants } from "@/constants";
import { config } from "@/config";

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
  const query = fs.readFileSync(
    path.join(__dirname, "migrations", "create_stages_table_up.sql"),
    { encoding: "utf-8" }
  );
  db.exec(query);

  console.log("=> db: migration applied successfully");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// close the db connection if the program received SIGINT
process.on("SIGINT", () => {
  db.close();
  process.exit(0);
});
