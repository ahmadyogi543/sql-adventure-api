// ++ USERS ++
export type UserProgress = {
  user_id: number;
  values: number[];
};

export type User = {
  id: number;
  username: string;
  password_hash: string;
  score: number;
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
