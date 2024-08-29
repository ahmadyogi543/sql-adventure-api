import { db } from "@/data/db";
import { GetOneUserProgress } from "./types";
import { getUsersProgressJSON } from "@/helpers/getUsersProgressJSON";

export function getOneUserProgress(id: number): GetOneUserProgress {
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

    return {
      userProgress,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      userProgress: null,
      error,
    };
  }
}
