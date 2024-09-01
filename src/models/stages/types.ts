export type StageJSONRow = {
  stage_id: number;
  stage_title: string;
  stage_introduction: string;
  stage_closing: string;
  stage_db_name: string;
  missions_id: number;
  missions_mission_id: number;
  missions_title: string;
  dialog_type: string;
  dialog_text: string;
  queries_id?: number;
  queries_type: string;
  queries_text: string;
  queries_validation?: string;
};
