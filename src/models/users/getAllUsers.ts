import { db } from "@/data/db";
import { User, UserRow } from "./types";

export function getAllUsers(): [User[], Error?] {
  try {
    const results = db
      .prepare("SELECT * FROM users WHERE role = 'user'")
      .all() as UserRow[];

    const users: User[] = results.map((result) => ({
      id: result.id,
      name: result.name,
      email: result.email,
      institution: result.institution,
      passwordHash: result.password_hash,
      role: result.role,
    }));

    return [users, undefined];
  } catch (err) {
    const error = err as Error;
    return [[], error];
  }
}
