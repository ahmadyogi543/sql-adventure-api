import { db } from "@/data/db";
import { GetAllHeadStagesResult, HeadStage } from "./types";

export function getAllHeadStages(): GetAllHeadStagesResult {
  try {
    const stmt = db.prepare("SELECT id, title FROM stages");
    const headStages = stmt.all() as HeadStage[];

    return {
      headStages,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      headStages: null,
      error,
    };
  }
}
