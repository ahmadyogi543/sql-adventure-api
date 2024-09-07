export type UserProgress = {
  id: number;
  userId: number;
  stageId: number;
  noOfMissions: number;
  lastAttempted: Date;
};

export type UserProgressRow = {
  id: number;
  user_id: number;
  stage_id: number;
  no_of_missions: number;
  last_attempted: string;
};

export type UserProgressJSONRow = {
  user_id: number;
  user_email: string;
  user_name: string;
  user_institution: string;
  users_progress_id?: number;
  users_progress_stage_id: number;
  users_progress_no_of_missions: number;
  users_progress_last_attempted: string | null;
  missions_attempted_id?: number;
  missions_attempted_mission_id: number;
  missions_attempted_attempt: number;
  missions_attempted_last_attempted: string;
  mission_attempted_scores_id?: number;
  mission_attempted_scores_score: number;
};
