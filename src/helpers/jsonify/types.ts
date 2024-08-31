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

// ++ STAGES ++
export type QueryJSON = {
  type: string;
  text: string;
  validation: string | null;
};

export type DialogJSON = {
  type: string;
  text: string;
  query: QueryJSON | null;
};

export type MissionJSON = {
  id: number;
  title: string;
  dialogs: DialogJSON[];
};

export type StageJSON = {
  id: number;
  title: string;
  introduction: string;
  closing: string;
  db_name: string;
  missions: MissionJSON[];
};
