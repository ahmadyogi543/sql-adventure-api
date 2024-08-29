import * as bcrypt from "bcryptjs";

import { db } from "@/data/db";
import { AddOneUserResult } from "./types";

export function addOneUser(
  username: string,
  password: string
): AddOneUserResult {
  try {
    const stmt = db.prepare(`
      INSERT INTO users (username, password_hash) VALUES (?, ?);
    `);
    const password_hash = bcrypt.hashSync(password, 12);
    const result = stmt.run(username, password_hash);

    const id = result.lastInsertRowid;
    const row = db
      .prepare("SELECT id, username FROM users WHERE id = ?")
      .get(id);

    return {
      user: row ? (row as { id: number; username: string }) : null,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      user: null,
      error,
    };
  }
}
