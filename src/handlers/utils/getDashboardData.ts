import { Request, Response } from "express";

import { getDashboardDataJSON } from "@/models/utils/getDashboardDataJSON";
import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";

export function getDashboardDataJSONHandler(_: Request, res: Response) {
  const [data, error] = getDashboardDataJSON();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  sendOKJSON(
    { dashboard_data: data },
    "retrieved dashboard data successfully",
    res
  );
}
