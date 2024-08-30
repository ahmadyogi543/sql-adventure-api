import { db } from "@/data/db";
import { User } from "@/models";

export function getAllUsers(): [User[], Error?] {
  try {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all() as User[];

    return [users, undefined];
  } catch (err) {
    const error = err as Error;

    return [[], error];
  }
}
