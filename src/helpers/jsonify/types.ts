// ++ USER PROGRESS ++
type MissionUserProgressJSON = {
  mission_id: number;
  mission_name: string;
  attempt: number;
  last_attempted: string;
};

type StageUserProgressJSON = {
  stage_id: number;
  no_of_missions: number;
  score: number;
  missions_attempted: MissionUserProgressJSON[];
  last_attempted: string | null;
};

export type UserProgressJSON = {
  user_id: number;
  user_email: string;
  user_name: string;
  user_institution: string;
  values: StageUserProgressJSON[];
};

// ++ STAGES ++
type QueryJSON = {
  type: string;
  text: string;
  validation: string | null;
};

type DialogJSON = {
  type: string;
  text: string;
  query: QueryJSON | null;
};

type MissionJSON = {
  mission_id: number;
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
