import { db } from "@/data/db";
import { GetAllUsersResult, User } from "./types";

export function getAllUsers(): GetAllUsersResult {
  try {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all() as User[];

    return {
      users,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      users: [],
      error,
    };
  }
}
