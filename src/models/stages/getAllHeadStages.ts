import { db } from "@/data/db";

type HeadStageRow = {
  id: number;
  title: string;
};

type HeadStage = {
  id: number;
  title: string;
};

export function getAllHeadStages(): [HeadStage[], Error?] {
  try {
    const results = db
      .prepare("SELECT id, title FROM stages")
      .all() as HeadStageRow[];

    const headStages: HeadStage[] = results.map((result) => ({
      id: result.id,
      title: result.title,
    }));
    return [headStages, undefined];
  } catch (err) {
    const error = err as Error;
    return [[], error];
  }
}
