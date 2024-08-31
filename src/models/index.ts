// ++ USERS ++
export type MissionUserProgressJSON = {
  attempted: number;
  scores: number[];
  last_attempted: Date;
};

export type StageUserProgressJSON = {
  stage_id: number;
  no_of_missions: number;
  missions_attempted: MissionUserProgressJSON[];
  last_attempted: Date | null;
};

export type UserProgressJSON = {
  user_id: number;
  values: StageUserProgressJSON[];
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
