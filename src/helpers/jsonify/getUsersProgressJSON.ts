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
        user_email: row.user_email,
        user_name: row.user_name,
        user_institution: row.user_institution,
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
        score: row.users_progress_score,
        last_attempted: row.users_progress_last_attempted
          ? formatDateToTimestamp(new Date(row.users_progress_last_attempted))
          : null,
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
        mission_name: row.missions_attempted_mission_name,
        attempt: row.missions_attempted_attempt,
        last_attempted: formatDateToTimestamp(
          new Date(row.missions_attempted_last_attempted)
        ),
      };
      progress.missions_attempted.push(mission);
    }
  });

  return json;
}
