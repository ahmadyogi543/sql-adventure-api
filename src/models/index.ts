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
  attempted_missions_id?: number;
  attempted_missions_mission_id: number;
  attempted_missions_attempt: number;
  attempted_missions_last_attempted: string;
  attempted_mission_scores_id?: number;
  attempted_mission_scores_score: number;
};

export type User = {
  id: number;
  username: string;
  password_hash: string;
  role: string;
};
