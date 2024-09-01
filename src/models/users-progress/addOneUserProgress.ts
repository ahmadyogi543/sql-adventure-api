import { db } from "@/data/db";

export function addOneUserProgress(
  userId: number,
  stageId: number,
  noOfMissions: number
): [boolean, Error?] {
  try {
    const stmt = db.prepare(
      `
      INSERT INTO users_progress (user_id, stage_id, no_of_missions)
      VALUES (?, ?, ?);
    `.trim()
    );
    const result = stmt.run(userId, stageId, noOfMissions);

    if (result.changes === 0) {
      return [false, new Error("failed to add data to users_progress")];
    }

    return [true, undefined];
  } catch (err) {
    const error = err as Error;
    return [false, error];
  }
}
