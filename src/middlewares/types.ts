export type UserPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
  iat: number;
  exp: number;
};
