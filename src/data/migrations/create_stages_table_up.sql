CREATE TABLE IF NOT EXISTS stages (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    introduction TEXT NOT NULL,
    closing TEXT NOT NULL,
    db_name TEXT
);

CREATE TABLE IF NOT EXISTS missions (
    id INTEGER PRIMARY KEY,
    stage_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (stage_id) REFERENCES stages(id)
);

CREATE TABLE IF NOT EXISTS dialogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (mission_id) REFERENCES missions(id)
);

CREATE TABLE IF NOT EXISTS sql_queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dialog_id INTEGER NOT NULL,
    query_type TEXT NOT NULL,
    query TEXT NOT NULL,
    FOREIGN KEY (dialog_id) REFERENCES dialogs(id)
);