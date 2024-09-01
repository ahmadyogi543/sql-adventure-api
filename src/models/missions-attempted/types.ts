export type MissionAttemptedRow = {
  id: number;
  users_progress_id: number;
  mission_id: number;
  attempt: number;
  last_attempted: string;
};

export type MissionAttempted = {
  id: number;
  usersProgressId: number;
  missionId: number;
  attempt: number;
  lastAttempted: Date;
};
