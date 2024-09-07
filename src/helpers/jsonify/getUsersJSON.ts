import { User } from "@/models/users/types";

export function getUsersJSON(users: User[]) {
  const json = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    institution: user.institution,
    role: user.role,
  }));

  return json;
}
