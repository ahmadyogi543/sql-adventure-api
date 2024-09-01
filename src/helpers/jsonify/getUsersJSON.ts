import { User } from "@/models/users/types";

export function getUsersJSON(users: User[]) {
  const json = users.map((user) => ({
    id: user.id,
    username: user.username,
    role: user.role,
  }));

  return json;
}
