import { db } from "@/data/db";
import { formatDateToTimestamp, formatDateToTimestampUTC } from "@/helpers";

export function addOneBannedToken(token: string, expiresAt: number): [Error?] {
  try {
    const stmt = db.prepare(
      `
      INSERT INTO banned_tokens (token, expires_at)
      VALUES (?, ?);
    `.trim()
    );
    const result = stmt.run(
      token,
      formatDateToTimestampUTC(new Date(expiresAt * 1000))
    );

    if (result.changes == 0) {
      return [new Error("failed when inserting data to banned_tokens table")];
    }

    return [undefined];
  } catch (err) {
    const error = err as Error;

    return [error];
  }
}
