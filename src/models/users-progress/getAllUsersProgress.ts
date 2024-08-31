import { db } from "@/data/db";
import { getUsersProgressJSON } from "@/helpers";
import { UserProgressJSON } from "@/models";

export function getAllUsersProgress(): [UserProgressJSON[], Error?] {
  try {
    const stmt = db.prepare(
      `
SELECT
  u.id as user_id,
  p.last_attempted as progress_last_attempted,
  am.id as attempted_missions_id,
  am.attempt as attempted_missions_attempt,
  am.last_attempted as attempted_missions_last_attempted,
  ams.id as attempted_mission_scores_id,
  ams.score as attempted_mission_scores_score
FROM users u
LEFT JOIN progresses p ON u.id = p.user_id
LEFT JOIN attempted_missions am ON p.id = am.progresses_id
LEFT JOIN aattempted_mission_scores ams ON am.id = ams.attempted_missions_id
WHERE u.role = 'user'
ORDER BY u.id, p.id, am.id, ams.id;
`.trim()
    );
    const usersProgress = getUsersProgressJSON(stmt.all());

    return [usersProgress, undefined];
  } catch (err) {
    const error = err as Error;

    return [[], error];
  }
}
