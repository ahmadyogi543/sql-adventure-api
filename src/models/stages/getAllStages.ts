import { db } from "@/data/db";
import { getStagesJSON } from "@/helpers";
import { StageJSON } from "@/helpers/jsonify/types";

export function getAllStages(): [StageJSON[], Error?] {
  try {
    const stmt = db.prepare(
      `
SELECT s.id AS stage_id,
       s.title AS stage_title,
       s.introduction AS stage_introduction,
       s.closing AS stage_closing,
       s.db_name AS stage_db_name,
       m.id AS missions_id,
       m.mission_id AS missions_mission_id,
       m.title AS missions_title,
       d.type AS dialog_type,
       d.text AS dialog_text,
       q.id AS queries_id,
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

    return [stages, undefined];
  } catch (err) {
    const error = err as Error;

    return [[], error];
  }
}
