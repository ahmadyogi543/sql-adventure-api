import { DialogJSON, StageJSON } from "./types";
import { StageRow } from "@/models";

export function getStagesJSON(input: any[]) {
  const json: StageJSON[] = [];

  const rows = input as StageRow[];
  rows.forEach((row) => {
    let stage = json.find((s) => s.id === row.stage_id);
    if (!stage) {
      stage = {
        id: row.stage_id,
        title: row.stage_title,
        introduction: row.stage_introduction,
        closing: row.stage_closing,
        db_name: row.stage_db_name,
        missions: [],
      };
      json.push(stage);
    }

    let mission = stage.missions.find(
      (m) => m.mission_id === row.missions_mission_id
    );
    if (!mission) {
      mission = {
        mission_id: row.missions_mission_id,
        title: row.missions_title,
        dialogs: [],
      };
      stage.missions.push(mission);
    }

    const dialog: DialogJSON = {
      type: row.dialog_type,
      text: row.dialog_text,
      query: row.queries_id
        ? {
            type: row.queries_type,
            text: row.queries_text,
            validation: row.queries_validation ? row.queries_validation : null,
          }
        : null,
    };
    mission.dialogs.push(dialog);
  });

  return json;
}
