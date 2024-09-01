import { db } from "@/data/db";
import { formatDateToTimestamp } from "@/helpers";

export function updateOneMissionAttempted(
  userProgressId: number,
  missionId: number,
  attempt: number
): [boolean, Error?] {
  try {
    const now = formatDateToTimestamp(new Date());
    const result = db
      .prepare(
        `
        UPDATE missions_attempted SET attempt = ?, last_attempted = ?
        WHERE users_progress_id = ? AND mission_id = ?
        `.trim()
      )
      .run(attempt, now, userProgressId, missionId);

    if (result.changes === 0) {
      return [false, undefined];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
