import { db } from "@/data/db";
import { GetAllStagesResult } from "../types";
import { getStagesJSON } from "@/helpers/getStagesJSON";

export function getAllStages(): GetAllStagesResult {
  try {
    const stmt = db.prepare(
      `
SELECT DISTINCT s.id AS stage_id,
       s.title AS stage_title,
       s.introduction AS stage_introduction,
       s.closing AS stage_closing,
       s.db_name AS stage_db_name,
       m.id AS mission_id,
       m.title AS mission_title,
       d.type AS dialog_type,
       d.text AS dialog_text,
       q.type AS queries_type,
       q.text AS queries_text,
       q.validation AS queries_validation
FROM stages s
LEFT JOIN missions m ON s.id = m.stage_id
LEFT JOIN dialogs d ON m.id = d.mission_id
LEFT JOIN queries q ON d.id = q.dialog_id
ORDER BY s.id, m.id, d.id, q.id;
    `.trim()
    );
    const stages = getStagesJSON(stmt.all());

    return {
      stages: stages,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      stages: [],
      error,
    };
  }
}
