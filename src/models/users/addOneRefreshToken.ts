import { db } from "@/data/db";

type AddOneRefreshTokenResult = {
  error: Error | null;
};

export function addOneRefreshToken(
  userId: number,
  username: string,
  token: string
): AddOneRefreshTokenResult {
  try {
    const stmt = db.prepare(
      `
      INSERT INTO refresh_tokens (user_id, username, token)
      VALUES (?, ?, ?):
    `.trim()
    );
    const result = stmt.run(userId, username, token);

    if (result.lastInsertRowid == 0) {
      return {
        error: new Error("failed when inserting data to refresh_tokens table"),
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
