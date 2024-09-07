import { db } from "@/data/db";
import { formatDateToTimestamp } from "@/helpers";

export function addOneMissionAttempted(
  userProgressId: number,
  missionId: number,
  missionName: string
): [number | bigint, boolean, Error?] {
  try {
    const now = formatDateToTimestamp(new Date());
    const result = db
      .prepare(
        `
        INSERT INTO missions_attempted (users_progress_id, mission_id, mission_name, attempt, last_attempted)
        VALUES (?, ?, ?, ?, ?)
        `.trim()
      )
      .run(userProgressId, missionId, missionName, 1, now);

    if (result.changes === 0) {
      return [0, false, undefined];
    }

    return [result.lastInsertRowid, true, undefined];
  } catch (err) {
    const error = err as Error;
    return [0, false, error];
  }
}
