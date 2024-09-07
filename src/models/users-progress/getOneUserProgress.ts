import { db } from "@/data/db";
import { UserProgress, UserProgressRow } from "./types";

export function getOneUserProgress(
  userId: number,
  stageId: number
): [UserProgress?, Error?] {
  try {
    const result = db
      .prepare(
        `
      SELECT id FROM users_progress
      WHERE user_id = ? AND stage_id = ?
      `.trim()
      )
      .get(userId, stageId) as UserProgressRow | undefined;
    if (!result) {
      return [undefined, undefined];
    }

    const userProgress: UserProgress = {
      id: result.id,
      userId: result.user_id,
      stageId: result.stage_id,
      noOfMissions: result.no_of_missions,
      score: result.score,
      lastAttempted: new Date(result.last_attempted),
    };
    return [userProgress, undefined];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
