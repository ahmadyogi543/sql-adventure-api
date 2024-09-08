import { UserProgressJSON } from "./types";

type StageData = {
  id: number;
  unlock: boolean;
  star: number;
  uri: string;
};

export function getStageDataJSON(userProgress: UserProgressJSON): StageData[] {
  const stages: StageData[] = [];
  const totalStages = 10;
  let previousStageCompleted = true;
  let previousStageScore = 100;
  const scoreThreshold = 80;

  // Helper function to calculate stars based on score
  const calculateStars = (score: number): number => {
    if (score === 100) {
      return 3;
    } else if (score >= 80) {
      return 2;
    } else if (score >= 60) {
      return 1;
    }
    return 0;
  };

  // Process each stage up to the total number
  for (let stageId = 1; stageId <= totalStages; stageId++) {
    // Get the current stage information if it exists
    const currentStage = userProgress.values.find(
      (stage) => stage.stage_id === stageId
    );

    // Determine if this stage is unlocked
    let unlock = previousStageCompleted && previousStageScore >= scoreThreshold;

    // Initialize stars and URI
    let star = 0;
    let uri = "/images/stage-cards/unknown.png";

    // If the current stage has data, calculate stars and other details
    if (currentStage) {
      const score = currentStage.score;
      star = calculateStars(score);
      previousStageCompleted =
        currentStage.missions_attempted.length === currentStage.no_of_missions;
      previousStageScore = score;

      // Set the URI for the unlocked stage
      if (unlock) {
        uri = `/images/stage-cards/${stageId}.png`;
      }
    } else {
      // If there's no data for this stage, mark it as locked
      previousStageCompleted = false;
      previousStageScore = 0;
    }

    // Add the mapped stage to the list
    stages.push({
      id: stageId,
      unlock: unlock,
      star: star,
      uri: unlock
        ? `/images/stage-cards/${stageId}.png`
        : "/images/stage-cards/unknown.png",
    });

    // If the current stage is locked, all following stages will also be locked
    if (!unlock) {
      previousStageCompleted = false;
      previousStageScore = 0;
    }
  }

  return stages;
}
