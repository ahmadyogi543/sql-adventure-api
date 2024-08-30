export type UserPayload = {
  id: number;
  username: string;
  role: "admin" | "user";
  iat: number;
  exp: number;
};
