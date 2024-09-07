import { User } from "@/models/users/types";

export function getUserJSON(user: User) {
  const json = {
    id: user.id,
    email: user.email,
    name: user.name,
    institution: user.institution,
    role: user.role,
  };

  return json;
}
