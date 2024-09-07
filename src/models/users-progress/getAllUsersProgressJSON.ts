import { db } from "@/data/db";
import { getUsersProgressJSON } from "@/helpers";
import { UserProgressJSON } from "@/helpers/jsonify/types";
import { UserProgressJSONRow } from "./types";

export function getAllUsersProgressJSON(): [UserProgressJSON[], Error?] {
  try {
    const result = db
      .prepare(
        `
SELECT
  u.id as user_id,
  u.email as user_email,
  u.name as user_name,
  u.institution as user_institution,
  up.id as users_progress_id,
  up.stage_id as users_progress_stage_id,
  up.no_of_missions as users_progress_no_of_missions,
  up.last_attempted as users_progress_last_attempted,
  ma.id as missions_attempted_id,
  ma.mission_id as missions_attempted_mission_id,
  ma.attempt as missions_attempted_attempt,
  ma.last_attempted as missions_attempted_last_attempted,
  mas.id as mission_attempted_scores_id,
  mas.score as mission_attempted_scores_score
FROM users u
LEFT JOIN users_progress up ON u.id = up.user_id
LEFT JOIN missions_attempted ma ON up.id = ma.users_progress_id
LEFT JOIN mission_attempted_scores mas ON ma.id = mas.missions_attempted_id
WHERE u.role = 'user'
ORDER BY u.id, up.id, ma.id, mas.id;
`.trim()
      )
      .all() as UserProgressJSONRow[];
    const usersProgress = getUsersProgressJSON(result);

    return [usersProgress, undefined];
  } catch (err) {
    const error = err as Error;
    return [[], error];
  }
}
