export type UserProgress = {
  id: number;
  userId: number;
  stageId: number;
  noOfMissions: number;
  score: number;
  lastAttempted: Date;
};

export type UserProgressRow = {
  id: number;
  user_id: number;
  stage_id: number;
  no_of_missions: number;
  score: number;
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
  users_progress_score: number;
  users_progress_last_attempted: string | null;
  missions_attempted_id?: number;
  missions_attempted_mission_id: number;
  missions_attempted_mission_name: string;
  missions_attempted_attempt: number;
  missions_attempted_last_attempted: string;
};
