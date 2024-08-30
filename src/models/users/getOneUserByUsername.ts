import { db } from "@/data/db";
import { User } from "@/models";

export function getOneUserByUsername(username: string): [User?, Error?] {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(username) as User;

    return [user, undefined];
  } catch (err) {
    const error = err as Error;

    return [undefined, error];
  }
}
