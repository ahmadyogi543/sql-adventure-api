import { db } from "@/data/db";
import { GetOneUserResult, User } from "./types";

export function getOneUser(id: number): GetOneUserResult {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = stmt.get(id) as User;

    return {
      user,
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
