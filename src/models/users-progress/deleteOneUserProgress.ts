import { db } from "@/data/db";

export function deleteOneUserProgress(userId: number): [boolean, Error?] {
  try {
    const stmt = db.prepare("DELETE FROM users_progress WHERE user_id = ?");
    const result = stmt.run(userId);
    if (result.changes === 0) {
      return [false, undefined];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
