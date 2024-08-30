import { db } from "@/data/db";
import { getUsersProgressJSON } from "@/helpers/jsonify/getUsersProgressJSON";
import { UserProgress } from "@/models";

export function getOneUserProgress(id: number): [UserProgress?, Error?] {
  try {
    const stmt = db.prepare(
      `
SELECT u.id as user_id,
       p.value as progress_value
FROM users u
LEFT JOIN progresses p ON u.id = p.user_id
WHERE u.id = ?
ORDER BY u.id, p.id;
`
    );
    const [userProgress] = getUsersProgressJSON(stmt.all(id));

    return [userProgress, undefined];
  } catch (err) {
    const error = err as Error;

    return [undefined, error];
  }
}
