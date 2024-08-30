import { db } from "@/data/db";

type DeleteOneRefreshTokenResult = {
  success: boolean;
  error: Error | null;
};

export function deleteOneRefreshToken(
  userId: number
): DeleteOneRefreshTokenResult {
  try {
    const stmt = db.prepare("DELETE FROM refresh_tokens WHERE user_id = ?");
    const result = stmt.run(userId);

    if (result.changes == 0) {
      return {
        success: false,
        error: null,
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      success: false,
      error,
    };
  }
}
