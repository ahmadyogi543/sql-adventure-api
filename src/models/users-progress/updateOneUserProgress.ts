import { db } from "@/data/db";
import { formatDateToTimestamp } from "@/helpers";

export function updateOneUserProgress(
  userId: number,
  stageId: number,
  score: number
): [boolean, Error?] {
  try {
    const stmt = db.prepare(
      `
      UPDATE users_progress
      SET score = ?, last_attempted = ?
      WHERE user_id = ? AND stage_id = ?
    `.trim()
    );
    const now = formatDateToTimestamp(new Date());
    const result = stmt.run(score, now, userId, stageId);
    if (result.changes === 0) {
      return [false, undefined];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
