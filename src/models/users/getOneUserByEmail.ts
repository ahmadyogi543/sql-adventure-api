import { db } from "@/data/db";
import { User, UserRow } from "./types";

export function getOneUserByEmail(email: string): [User?, Error?] {
  try {
    const result = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as UserRow | undefined;

    if (!result) {
      return [undefined, undefined];
    }

    const user: User = {
      id: result.id,
      name: result.name,
      email: result.email,
      institution: result.institution,
      passwordHash: result.password_hash,
      role: result.role,
    };

    return [user, undefined];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
