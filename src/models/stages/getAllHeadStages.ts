import { db } from "@/data/db";

type HeadStage = {
  id: number;
  title: string;
};

export function getAllHeadStages(): [HeadStage[], Error?] {
  try {
    const stmt = db.prepare("SELECT id, title FROM stages");
    const headStages = stmt.all() as HeadStage[];

    return [headStages, undefined];
  } catch (err) {
    const error = err as Error;

    return [[], error];
  }
}
