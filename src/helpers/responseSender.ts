import { Response } from "express";

export function sendOKJSON(data: any, message: string, res: Response) {
  res.json({
    status: "success",
    message,
    data,
  });
}

export function sendCreatedJSON(data: any, message: string, res: Response) {
  res.status(201).json({
    status: "success",
    message,
    data,
  });
}

export function sendNoContentJSON(res: Response) {
  res.sendStatus(204);
}

export function sendBadRequestJSON(message: string, res: Response) {
  res.status(400).json({
    status: "failed",
    message,
  });
}

export function sendNotFoundJSON(message: string, res: Response) {
  res.status(404).json({
    status: "failed",
    message,
  });
}

export function sendInternalServerErrorJSON(error: Error, res: Response) {
  res.status(500).json({
    status: "error",
    message: "interval server error",
  });

  console.error(error);
}
