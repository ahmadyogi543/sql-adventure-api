import { db } from "@/data/db";
import { getUsersProgressJSON } from "@/helpers";
import { UserProgressJSON } from "@/helpers/jsonify/types";

export function getAllUsersProgress(): [UserProgressJSON[], Error?] {
  try {
    const stmt = db.prepare(
      `
SELECT
  u.id as user_id,
  up.id as users_progress_id,
  up.stage_id as users_progress_stage_id,
  up.no_of_missions as users_progress_no_of_missions,
  up.last_attempted as users_progress_last_attempted,
  am.id as attempted_missions_id,
  am.mission_id as attempted_missions_mission_id,
  am.attempt as attempted_missions_attempt,
  am.last_attempted as attempted_missions_last_attempted,
  ams.id as attempted_mission_scores_id,
  ams.score as attempted_mission_scores_score
FROM users u
LEFT JOIN users_progress up ON u.id = up.user_id
LEFT JOIN attempted_missions am ON up.id = am.users_progress_id
LEFT JOIN attempted_mission_scores ams ON am.id = ams.attempted_missions_id
WHERE u.role = 'user'
ORDER BY u.id, up.id, am.id, ams.id;
`.trim()
    );
    const usersProgress = getUsersProgressJSON(stmt.all());

    return [usersProgress, undefined];
  } catch (err) {
    const error = err as Error;

    return [[], error];
  }
}
