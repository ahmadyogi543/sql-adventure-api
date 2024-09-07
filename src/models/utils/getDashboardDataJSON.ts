import { db } from "@/data/db";

type DashboardDataJSON = {
  no_of_users: number;
  no_of_users_done: number;
  scores: {
    lowest: number[];
    average: number[];
    highest: number[];
  };
};

export function getDashboardDataJSON(): [DashboardDataJSON?, Error?] {
  try {
    const { no_of_users } = db
      .prepare("SELECT COUNT(*) AS no_of_users FROM users WHERE role = 'user'")
      .get() as { no_of_users: number };

    const { no_of_users_done } = db
      .prepare(
        `
-- Find users who have completed all stages
WITH users_with_all_stages AS (
    SELECT user_id
    FROM users_progress
    JOIN users
    ON users.id = users_progress.user_id
    WHERE users.role = 'user'
    GROUP BY user_id
    HAVING COUNT(DISTINCT stage_id) = 10
)

-- Find users who have the required number of missions attempted
SELECT COUNT(*) AS no_of_users_done
FROM users_with_all_stages uwas
WHERE EXISTS (
    SELECT 1
    FROM users_progress up
    JOIN missions_attempted ma
    ON up.id = ma.users_progress_id
    JOIN users
    ON users.id = up.user_id
    WHERE up.user_id = uwas.user_id
    AND users.role = 'user'
    GROUP BY up.user_id
    HAVING COUNT(ma.id) = MAX(up.no_of_missions)
);

      `.trim()
      )
      .get() as { no_of_users_done: number };

    const result = db
      .prepare(
        `
SELECT stage_id,
  MIN(score) AS lowest,
  AVG(score) AS average,
  MAX(score) AS highest
FROM users_progress
JOIN users
ON users.id = users_progress.user_id
WHERE users.role = 'user'
GROUP BY stage_id;
      `
      )
      .all() as { lowest: number; average: number; highest: number }[];

    return [
      {
        no_of_users,
        no_of_users_done,
        scores: {
          lowest: result.map((res) => res.lowest),
          average: result.map((res) => res.average),
          highest: result.map((res) => res.highest),
        },
      },
      undefined,
    ];
  } catch (err) {
    const error = err as Error;
    return [undefined, error];
  }
}
