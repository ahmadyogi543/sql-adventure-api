import { db } from "@/data/db";

export function addOneToken(
  userId: number,
  username: string,
  token: string
): [Error?] {
  try {
    const stmt = db.prepare(
      `
      INSERT INTO tokens (user_id, username, token)
      VALUES (?, ?, ?);
    `.trim()
    );
    const result = stmt.run(userId, username, token);

    if (result.changes == 0) {
      return [new Error("failed when inserting data to tokens table")];
    }

    return [undefined];
  } catch (err) {
    const error = err as Error;

    return [error];
  }
}
