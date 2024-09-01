import { db } from "@/data/db";
import { User, UserRow } from "./types";

export function getOneUserByUsername(username: string): [User?, Error?] {
  try {
    const result = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username) as UserRow | undefined;

    if (!result) {
      return [undefined, undefined];
    }

    const user: User = {
      id: result.id,
      username: result.username,
      passwordHash: result.password_hash,
      role: result.role,
    };

    return [user, undefined];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
