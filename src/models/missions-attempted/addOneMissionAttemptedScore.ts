import { db } from "@/data/db";
import { formatDateToTimestamp } from "@/helpers";

export function addOneMissionAttemptedScore(
  missionAttemptedId: number,
  score: number
): [boolean, Error?] {
  try {
    const now = formatDateToTimestamp(new Date());
    const result = db
      .prepare(
        `
        INSERT INTO mission_attempted_scores (missions_attempted_id, score)
        VALUES (?, ?)
        `.trim()
      )
      .run(missionAttemptedId, score);

    if (result.changes === 0) {
      return [false, undefined];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
