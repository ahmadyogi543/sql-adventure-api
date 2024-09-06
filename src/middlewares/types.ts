export type UserPayload = {
  id: number;
  name: string;
  email: string;
  institution: string;
  role: "admin" | "user";
  iat: number;
  exp: number;
};
