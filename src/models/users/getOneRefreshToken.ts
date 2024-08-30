import { db } from "@/data/db";

type RefreshTokenRow = {
  user_id: number;
  username: string;
  token: string;
};

type RefreshToken = {
  userId: number;
  username: string;
  token: string;
};

type GetOneRefreshTokenResult = {
  refreshToken: RefreshToken | null;
  error: Error | null;
};

export function getOneRefreshToken(token: string): GetOneRefreshTokenResult {
  try {
    const stmt = db.prepare("SELECT * FROM refresh_tokens WHERE token = ?");
    const refreshToken = stmt.get(token) as RefreshTokenRow | undefined;

    if (!refreshToken) {
      return { refreshToken: null, error: null };
    }

    return {
      refreshToken: {
        userId: refreshToken.user_id,
        username: refreshToken.username,
        token: refreshToken.token,
      },
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
