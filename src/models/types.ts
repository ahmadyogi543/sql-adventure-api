import { Stage } from "./stages/records";

export type GetAllStagesResult = { stages: Stage[]; error: Error | null };
export type GetOneStageResult = { stage: Stage | null; error: Error | null };
