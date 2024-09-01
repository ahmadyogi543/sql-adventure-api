import { db } from "@/data/db";
import { formatDateToTimestamp } from "@/helpers";

export function addOneMissionAttempted(
  userProgressId: number,
  missionId: number
): [boolean, Error?] {
  try {
    const now = formatDateToTimestamp(new Date());
    const result = db
      .prepare(
        `
        INSERT INTO missions_attempted (users_progress_id, mission_id, attempt, last_attempted)
        VALUES (?, ?, ?, ?)
        `.trim()
      )
      .run(userProgressId, missionId, 1, now);

    if (result.changes === 0) {
      return [
        false,
        new Error("failed to add data to missions_attempted table"),
      ];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
