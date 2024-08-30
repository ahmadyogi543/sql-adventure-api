import * as bcrypt from "bcryptjs";

import { db } from "@/data/db";
import { User } from "@/models";

export function addOneUser(
  username: string,
  password: string
): [User?, Error?] {
  try {
    const stmt = db.prepare(`
      INSERT INTO users (username, password_hash) VALUES (?, ?);
    `);
    const password_hash = bcrypt.hashSync(password, 12);
    const result = stmt.run(username, password_hash);

    const id = result.lastInsertRowid;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;

    return [user, undefined];
  } catch (err) {
    const error = err as Error;

    return [undefined, error];
  }
}
