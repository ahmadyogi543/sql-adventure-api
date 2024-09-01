import * as bcrypt from "bcryptjs";

import { db } from "@/data/db";
import { getOneUser } from "./getOneUser";
import { User } from "./types";

export function addOneUser(
  username: string,
  password: string,
  role: string = "user"
): [User?, Error?] {
  try {
    const password_hash = bcrypt.hashSync(password, 12);
    const result = db
      .prepare(
        `
      INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?);
    `.trim()
      )
      .run(username, password_hash, role);

    if (result.changes === 0) {
      return [undefined, undefined];
    }

    const id = result.lastInsertRowid as number;
    const [user, error] = getOneUser(id);
    if (error) {
      return [undefined, undefined];
    }

    return [user, undefined];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
