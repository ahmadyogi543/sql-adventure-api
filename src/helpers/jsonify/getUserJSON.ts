import { User } from "@/models/users/types";

export function getUserJSON(user: User) {
  const json = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return json;
}
