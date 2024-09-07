import { db } from "@/data/db";

export function deleteOneUser(id: number): [boolean, Error?] {
  try {
    const result = db
      .prepare("DELETE FROM users WHERE id = ? AND role = 'user'")
      .run(id);

    if (result.changes === 0) {
      return [false, undefined];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
