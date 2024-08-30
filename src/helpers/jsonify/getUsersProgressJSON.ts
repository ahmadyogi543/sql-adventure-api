import { UserProgress } from "@/models";

type UserProgressJSON = {
  user_id: number;
  progress_value: number | null;
};

export function getUsersProgressJSON(rows: any[]) {
  const usersProgress: UserProgress[] = [];

  rows.forEach((row) => {
    const { user_id, progress_value } = row as UserProgressJSON;

    if (!usersProgress[user_id]) {
      usersProgress[user_id] = {
        user_id: user_id,
        values: [],
      };
    }

    if (progress_value) usersProgress[user_id].values.push(progress_value);
  });

  return Object.values(usersProgress);
}
