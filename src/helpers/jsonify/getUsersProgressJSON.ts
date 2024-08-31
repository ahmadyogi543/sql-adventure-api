import { UserProgressJSON, MissionUserProgressJSON } from "@/models";

type UserProgressRow = {
  user_id: number;
  progress_last_attempted?: string;
  attempted_missions_id?: number;
  attempted_missions_attempt: number;
  attempted_missions_last_attempted: string;
  attempted_mission_scores_id?: number;
  attempted_mission_scores_score: number;
};

export function getUsersProgressJSON(rows: any[]) {
  const json: UserProgressJSON[] = [];

  let index = 0;
  rows.forEach((row) => {
    const {
      user_id,
      progress_last_attempted,
      attempted_mission_scores_id,
      attempted_missions_attempt,
      attempted_missions_last_attempted,
      attempted_missions_id,
      attempted_mission_scores_score,
    } = row as UserProgressRow;

    if (!json[user_id]) {
      json[user_id] = {
        user_id: user_id,
        values: [],
      };
    }

    let value = json[user_id].values.find(
      (value) => value.stage_id === index + 1
    );
    if (!value) {
      value = {
        stage_id: index + 1,
        no_of_missions: 5,
        last_attempted: progress_last_attempted
          ? new Date(progress_last_attempted)
          : null,
        missions_attempted: [],
      };
      json[user_id].values.push(value);
    }

    if (!attempted_missions_id) return;
    const upm: MissionUserProgressJSON = {
      attempted: attempted_missions_attempt,
      last_attempted: new Date(attempted_missions_last_attempted),
      scores: [],
    };

    if (!attempted_mission_scores_id) return;
    upm.scores.push(attempted_mission_scores_score);

    index++;
  });

  return Object.values(json);
}
