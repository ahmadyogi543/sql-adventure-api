import { db } from "@/data/db";
import { User } from "@/models";

export function getOneUser(id: number): [User?, Error?] {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = stmt.get(id) as User;

    return [user, undefined];
  } catch (err) {
    const error = err as Error;

    return [undefined, error];
  }
}
