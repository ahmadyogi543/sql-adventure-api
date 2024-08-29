import { UserProgress } from "@/models/users/types";

type UserProgressJSON = {
  user_id: number;
  progress_id: number;
  progress_value: number;
};

export function getUsersProgressJSON(rows: any[]) {
  const usersProgress: UserProgress[] = [];

  rows.forEach((row) => {
    const { user_id, progress_id, progress_value } = row as UserProgressJSON;

    if (!usersProgress[progress_id]) {
      usersProgress[progress_id] = {
        user_id: user_id,
        values: [progress_value],
      };
    }

    usersProgress[progress_id].values.push(progress_value);
  });

  return Object.values(usersProgress);
}
