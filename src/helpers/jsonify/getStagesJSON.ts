import { Dialog, Stage } from "@/models";

type StagesJSON = {
  stage_id: number;
  stage_title: string;
  stage_introduction: string;
  stage_closing: string;
  stage_db_name: string;
  mission_title: string;
  dialog_type: string;
  dialog_text: string;
  queries_type: string;
  queries_text: string;
  queries_validation: string | null;
};

export function getStagesJSON(rows: any[]) {
  const stages: Stage[] = [];

  rows.forEach((row) => {
    const {
      stage_id,
      stage_title,
      stage_introduction,
      stage_closing,
      stage_db_name,
      mission_title,
      dialog_type,
      dialog_text,
      queries_type,
      queries_text,
      queries_validation,
    } = row as StagesJSON;

    if (!stages[stage_id]) {
      stages[stage_id] = {
        id: stage_id,
        title: stage_title,
        introduction: stage_introduction,
        closing: stage_closing,
        db_name: stage_db_name,
        missions: [],
      };
    }

    // NOTE: I know this is not the good idea
    // it's should use the id to diffrentiate the mission
    let mission = stages[stage_id].missions.find(
      (m) => m.title === mission_title
    );
    if (!mission) {
      mission = {
        title: mission_title,
        dialogs: [],
      };
      stages[stage_id].missions.push(mission);
    }

    const dialog: Dialog = {
      type: dialog_type,
      text: dialog_text,
      query:
        queries_type && queries_text
          ? {
              type: queries_type,
              text: queries_text,
              validation: queries_validation,
            }
          : null,
    };
    mission.dialogs.push(dialog);
  });

  return Object.values(stages);
}
