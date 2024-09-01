import { formatDateToTimestamp } from "@/helpers";
import { UserProgressJSON } from "./types";
import { UserProgressJSONRow } from "@/models/users-progress/types";

export function getUsersProgressJSON(rows: UserProgressJSONRow[]) {
  const json: UserProgressJSON[] = [];

  rows.forEach((row) => {
    let user = json.find((u) => u.user_id === row.user_id);

    if (!user) {
      user = {
        user_id: row.user_id,
        values: [],
      };
      json.push(user);
    }

    if (!row.users_progress_id) return;
    let progress = user.values.find(
      (v) => v.stage_id === row.users_progress_stage_id
    );
    if (!progress) {
      progress = {
        stage_id: row.users_progress_stage_id,
        no_of_missions: row.users_progress_no_of_missions,
        last_attempted: formatDateToTimestamp(
          new Date(row.users_progress_last_attempted)
        ),
        missions_attempted: [],
      };
      user.values.push(progress);
    }

    if (!row.missions_attempted_id) return;
    let mission = progress.missions_attempted.find(
      (m) => m.mission_id === row.missions_attempted_mission_id
    );
    if (!mission) {
      mission = {
        mission_id: row.missions_attempted_mission_id,
        attempt: row.missions_attempted_attempt,
        last_attempted: formatDateToTimestamp(
          new Date(row.missions_attempted_last_attempted)
        ),
        scores: [],
      };
      progress.missions_attempted.push(mission);
    }

    if (!row.mission_attempted_scores_id) return;
    mission.scores.push(row.mission_attempted_scores_score);
  });

  return json;
}
