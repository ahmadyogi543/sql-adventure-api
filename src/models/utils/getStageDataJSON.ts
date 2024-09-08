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
),
progress_with_unlock AS (
  SELECT 
    up.stage_id,
    up.score,
    CASE 
      WHEN up.stage_id = 1 THEN 1 -- Stage 1 is always unlocked
      WHEN LAG(up.score) OVER (ORDER BY up.stage_id) >= 80 THEN 1 -- Unlock if the previous stage score is >= 80
      ELSE 0
    END AS unlock
  FROM users_progress up
  WHERE up.user_id = ?
)
SELECT 
  stages.stage_id AS id,
  COALESCE(progress_with_unlock.unlock, CASE WHEN stages.stage_id = 1 THEN 1 ELSE 0 END) AS unlock,
  CASE 
    WHEN progress_with_unlock.score >= 100 THEN 3
    WHEN progress_with_unlock.score >= 50 THEN 2
    WHEN progress_with_unlock.score >= 10 THEN 1
    ELSE 0
  END AS star,
  CASE 
    WHEN COALESCE(progress_with_unlock.unlock, CASE WHEN stages.stage_id = 1 THEN 1 ELSE 0 END) = 1 THEN '/images/stage-cards/' || stages.stage_id || '.png'
    ELSE '/images/stage-cards/unknown.png'
  END AS uri
FROM stages
LEFT JOIN progress_with_unlock ON stages.stage_id = progress_with_unlock.stage_id
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
