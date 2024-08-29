import { db } from "@/data/db";
import { GetOneUserResult, User } from "./types";

export function getOneUserByUsername(username: string): GetOneUserResult {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(username) as User;

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
