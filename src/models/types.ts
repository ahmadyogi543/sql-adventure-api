import { HeadStage, Stage } from "./stages/records";

export type GetAllHeadStagesResult = {
  headStages: HeadStage[] | null;
  error: Error | null;
};
export type GetAllStagesResult = { stages: Stage[]; error: Error | null };
export type GetOneStageResult = { stage: Stage | null; error: Error | null };
