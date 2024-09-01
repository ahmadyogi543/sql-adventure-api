import { db } from "@/data/db";

type MissionAttemptedRow = {
  id: number;
  users_progress_id: number;
  mission_id: number;
  attempt: number;
  last_attempted: string;
};

export type MissionAttempted = {
  id: number;
  usersProgressId: number;
  missionId: number;
  attempt: number;
  lastAttempted: Date;
};

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
      return [
        undefined,
        new Error("failed to get data from missions_attempted table"),
      ];
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
