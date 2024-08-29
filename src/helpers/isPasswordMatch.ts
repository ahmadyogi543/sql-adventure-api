import { compareSync } from "bcryptjs";

export function isPasswordMatch(considered: string, real: string) {
  const match = compareSync(considered, real);
  return match;
}
