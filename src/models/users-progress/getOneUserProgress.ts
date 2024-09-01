import { db } from "@/data/db";

type UserProgressRow = {
  id: number;
  user_id: number;
  stage_id: number;
  no_of_missions: number;
  last_attempted: string;
};

export type UserProgress = {
  id: number;
  userId: number;
  stageId: number;
  noOfMissions: number;
  lastAttempted: Date;
};

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
      return [undefined, new Error("failed to atttempt mission")];
    }

    const userProgress: UserProgress = {
      id: result.id,
      userId: result.user_id,
      stageId: result.stage_id,
      noOfMissions: result.no_of_missions,
      lastAttempted: new Date(result.last_attempted),
    };

    return [userProgress, undefined];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
