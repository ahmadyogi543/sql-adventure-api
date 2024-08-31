// ++ ROWS ++
export type StageRow = {
  stage_id: number;
  stage_title: string;
  stage_introduction: string;
  stage_closing: string;
  stage_db_name: string;
  missions_id: number;
  missions_mission_id: number;
  missions_title: string;
  dialog_type: string;
  dialog_text: string;
  queries_id?: number;
  queries_type: string;
  queries_text: string;
  queries_validation?: string;
};

export type UserProgressRow = {
  user_id: number;
  users_progress_id?: number;
  users_progress_stage_id: number;
  users_progress_no_of_missions: number;
  users_progress_last_attempted: string;
  missions_attempted_id?: number;
  missions_attempted_mission_id: number;
  missions_attempted_attempt: number;
  missions_attempted_last_attempted: string;
  mission_attempted_scores_id?: number;
  mission_attempted_scores_score: number;
};

export type User = {
  id: number;
  username: string;
  password_hash: string;
  role: string;
};
