import { formatDateToTimestamp } from "@/helpers";
import { UserProgressRow } from "@/models";
import { UserProgressJSON } from "./types";

export function getUsersProgressJSON(input: any[]) {
  const json: UserProgressJSON[] = [];

  const rows = input as UserProgressRow[];
  rows.forEach((row) => {
    let user = json.find((u) => u.user_id === row.user_id);

    if (!user) {
      user = {
        user_id: row.user_id,
        values: [],
      };
      json.push(user);
    }

    if (row.users_progress_id !== undefined) {
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

      if (row.attempted_missions_id !== undefined) {
        let mission = progress.missions_attempted.find(
          (m) => m.mission_id === row.attempted_missions_mission_id
        );

        if (!mission) {
          mission = {
            mission_id: row.attempted_missions_mission_id,
            attempt: row.attempted_missions_attempt,
            last_attempted: formatDateToTimestamp(
              new Date(row.attempted_missions_last_attempted)
            ),
            scores: [],
          };
          progress.missions_attempted.push(mission);
        }

        if (row.attempted_mission_scores_id !== undefined) {
          mission.scores.push(row.attempted_mission_scores_score);
        }
      }
    }
  });

  return json;
}
