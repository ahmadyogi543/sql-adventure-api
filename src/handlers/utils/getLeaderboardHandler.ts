import { sendInternalServerErrorJSON, sendOKJSON } from "@/helpers";
import { getAllUsersProgressJSON } from "@/models/users-progress";
import { Request, Response } from "express";

export function getLeaderBoardJSONHandler(req: Request, res: Response) {
  const [usersProgress, error] = getAllUsersProgressJSON();
  if (error) {
    sendInternalServerErrorJSON(error, res);
    return;
  }

  const transformedData = usersProgress.map((user) => {
    const totalScore = user.values.reduce((sum, stage) => sum + stage.score, 0);
    const averageScore = totalScore / user.values.length;

    return {
      name: user.user_name,
      institution: user.user_institution,
      score: averageScore,
    };
  });

  sendOKJSON(
    { leaderboard_data: transformedData.sort((a, b) => b.score - a.score) },
    "retrieved stage data successfully",
    res
  );
}
