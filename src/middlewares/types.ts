export type UserPayload = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  iat: number;
  exp: number;
};
