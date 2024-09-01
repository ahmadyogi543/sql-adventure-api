import { db } from "@/data/db";
import { formatDateToTimestampUTC } from "@/helpers";

export function deleteAllBannedTokens(): [Error?] {
  try {
    const now = formatDateToTimestampUTC(new Date());

    const stmt = db.prepare("DELETE FROM banned_tokens WHERE expires_at <= ?");
    stmt.run(now);

    return [undefined];
  } catch (err) {
    const error = err as Error;
    return [error];
  }
}
