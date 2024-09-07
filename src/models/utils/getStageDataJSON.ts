import { db } from "@/data/db";

type StageDataJSON = {
  id: number;
  unlock: boolean;
  star: number;
  uri: string;
};

export function getStageDataJSON(id: number): [StageDataJSON[], Error?] {
  try {
    const result = db
      .prepare(
        `
WITH stages AS (
  SELECT 1 AS stage_id UNION ALL
  SELECT 2 UNION ALL
  SELECT 3 UNION ALL
  SELECT 4 UNION ALL
  SELECT 5 UNION ALL
  SELECT 6 UNION ALL
  SELECT 7 UNION ALL
  SELECT 8 UNION ALL
  SELECT 9 UNION ALL
  SELECT 10
)
SELECT 
  stages.stage_id AS id,
  CASE 
    WHEN stages.stage_id = 1 THEN 1 -- Ensure stage 1 is always unlocked
    WHEN users_progress.stage_id IS NOT NULL THEN 1
    ELSE 0
  END AS unlock,
  CASE 
    WHEN users_progress.score >= 100 THEN 3
    WHEN users_progress.score >= 50 THEN 2
    WHEN users_progress.score >= 10 THEN 1
    ELSE 0
  END AS star,
  CASE 
    WHEN stages.stage_id = 1 OR users_progress.stage_id IS NOT NULL THEN '/images/stage-cards/' || stages.stage_id || '.png'
    ELSE '/images/stage-cards/unknown.png'
  END AS uri
FROM stages
LEFT JOIN users_progress ON stages.stage_id = users_progress.stage_id AND users_progress.user_id = ?
ORDER BY stages.stage_id;
      `.trim()
      )
      .all(id) as StageDataJSON[];

    return [result, undefined];
  } catch (err) {
    const error = err as Error;
    return [[], error];
  }
}
