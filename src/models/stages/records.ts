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
