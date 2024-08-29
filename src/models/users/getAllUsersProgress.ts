import { db } from "@/data/db";
import { GetAllUsersProgress } from "./types";
import { getUsersProgressJSON } from "@/helpers/getUsersProgressJSON";

export function getAllUsersProgress(): GetAllUsersProgress {
  try {
    const stmt = db.prepare(
      `
SELECT u.id as user_id,
       p.value as progress_value
FROM users u
LEFT JOIN progresses p ON u.id = p.user_id
ORDER BY u.id, p.id;
`
    );
    const usersProgress = getUsersProgressJSON(stmt.all());

    return {
      usersProgress,
      error: null,
    };
  } catch (err) {
    const error = err as Error;

    return {
      usersProgress: [],
      error,
    };
  }
}
