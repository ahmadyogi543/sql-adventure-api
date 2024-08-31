// ++ USERS ++
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

// ++ STAGES ++
export type Query = {
  type: string;
  text: string;
  validation: string | null;
};

export type Dialog = {
  type: string;
  text: string;
  query: Query | null;
};

export type Mission = {
  title: string;
  dialogs: Dialog[];
};

export type Stage = {
  id: number;
  title: string;
  introduction: string;
  closing: string;
  db_name: string;
  missions: Mission[];
};

export type HeadStage = {
  id: number;
  title: string;
};
