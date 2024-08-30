import { db } from "@/data/db";

type DeleteOneRefreshTokenResult = {
  error: Error | null;
};

export function deleteOneRefreshToken(
  userId: number
): DeleteOneRefreshTokenResult {
  try {
    const stmt = db.prepare("DELETE FROM refresh_tokens WHERE user_id = ?");
    const result = stmt.run(userId);

    if (result.lastInsertRowid == 0) {
      return {
        error: new Error("failed to delete refresh_tokens"),
      };
    }

    return {
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      error,
    };
  }
}
