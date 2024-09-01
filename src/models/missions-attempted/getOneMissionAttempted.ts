import { db } from "@/data/db";
import { MissionAttempted, MissionAttemptedRow } from "./types";

export function getOneMissionAttempted(
  userProgressId: number,
  missionId: number
): [MissionAttempted?, Error?] {
  try {
    const result = db
      .prepare(
        `
      SELECT * FROM missions_attempted
      WHERE users_progress_id = ? AND mission_id = ?
      `.trim()
      )
      .get(userProgressId, missionId) as MissionAttemptedRow | undefined;

    if (!result) {
      return [undefined, undefined];
    }

    const missionAttempted: MissionAttempted = {
      id: result.id,
      usersProgressId: result.users_progress_id,
      missionId: result.mission_id,
      attempt: result.attempt,
      lastAttempted: new Date(result.last_attempted),
    };

    return [missionAttempted, undefined];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
