import { db } from "@/data/db";

export function findOneBannedToken(token: string): [boolean, Error?] {
  try {
    const stmt = db.prepare("SELECT * FROM banned_tokens WHERE token = ?");
    const result = stmt.get(token);

    if (!result) return [false, undefined];

    return [true, undefined];
  } catch (err) {
    const error = err as Error;

    return [false, error];
  }
}
