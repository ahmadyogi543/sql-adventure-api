import { Request } from "express";

export type UserPayload = {
  id: number;
  username: string;
};

export interface AuthRequest extends Request {
  user?: UserPayload;
}
