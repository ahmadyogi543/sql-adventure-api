import { Request, Response } from "express";

export function welcomeHandler(_: Request, res: Response) {
  res.json({
    message: "Welcome to SQL Adventure API!",
  });
}
