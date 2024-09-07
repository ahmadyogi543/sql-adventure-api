import { Request, Response } from "express";

export function testHandler(_: Request, res: Response) {
  res.json({ message: "test" });
}
