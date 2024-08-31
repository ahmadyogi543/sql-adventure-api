export type MissionUserProgressJSON = {
  mission_id: number;
  attempt: number;
  scores: number[];
  last_attempted: string;
};

export type StageUserProgressJSON = {
  stage_id: number;
  no_of_missions: number;
  missions_attempted: MissionUserProgressJSON[];
  last_attempted: string;
};

export type UserProgressJSON = {
  user_id: number;
  values: StageUserProgressJSON[];
};
