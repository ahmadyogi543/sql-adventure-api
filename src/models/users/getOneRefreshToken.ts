import { db } from "@/data/db";

export type RefreshToken = {
  id: number;
  user_id: number;
  username: string;
  token: string;
};

type GetOneRefreshTokenResult = {
  refreshToken: RefreshToken | null;
  error: Error | null;
};

export function getOneRefreshToken(userId: number): GetOneRefreshTokenResult {
  try {
    const stmt = db.prepare("SELECT * FROM refresh_tokens WHERE user_id = ?");
    const refreshToken = stmt.get(userId) as RefreshToken;

    return {
      refreshToken,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      refreshToken: null,
      error,
    };
  }
}
