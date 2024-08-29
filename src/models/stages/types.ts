// RECORDS
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

// RETURN VALUES
export type GetAllHeadStagesResult = {
  headStages: HeadStage[] | null;
  error: Error | null;
};
export type GetAllStagesResult = { stages: Stage[]; error: Error | null };
export type GetOneStageResult = { stage: Stage | null; error: Error | null };
