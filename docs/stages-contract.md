# SQL Adventure API Contract (STAGES)

- HTTP GET /stages/:id

```jsonc
[
  {
    "id": 1,
    "title": "Menjelajah Pulau Kembang",
    "introduction": "Selamat datang di Pulau Kembang! Kamu...",
    "missions": [
      {
        "id": 1,
        "title": "Menampilkan Biaya Kunjungan",
        "dialogs": [
          {
            "type": "NARRATION",
            "text": "Mengetahui biaya kunjungan sangat penting..."
          },
          {
            "type": "INSTRUCTION",
            "text": "Ketikan query untuk menampilkan...",
            "sql": {
              "type": "READ",
              "query": "SELECT * FROM biaya"
            }
          }
          // ...
        ]
      }
      // ...
    ],
    "closing": "Selamat! Kamu telah menyelesaikan semua misi...",
    "db_name": "stage1.db"
  }
]
```

- stages

```sql
CREATE TABLE IF NOT EXISTS stages (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    introduction TEXT NOT NULL,
    closing TEXT NOT NULL,
    db_name TEXT
);

```

- missions

```sql
CREATE TABLE IF NOT EXISTS missions (
    id INTEGER PRIMARY KEY,
    stage_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (stage_id) REFERENCES stages(id)
);
```

- dialogs

```sql
CREATE TABLE dialogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (mission_id) REFERENCES missions(id)
);
```

- sql_queries

```sql
CREATE TABLE sql_queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dialog_id INTEGER NOT NULL,
    query_type TEXT NOT NULL,
    query TEXT NOT NULL,
    FOREIGN KEY (dialog_id) REFERENCES dialogs(id)
);
```

- to json

```sql
SELECT s.id AS stage_id, s.title AS stage_title, s.introduction AS stage_introduction, s.closing AS stage_closing, s.filepath AS stage_filepath,
       m.id AS mission_id, m.title AS mission_title,
       d.id AS dialog_id, d.type AS dialog_type, d.text AS dialog_text,
       q.query_type AS query_type, q.query AS query_text
FROM stages s
LEFT JOIN missions m ON s.id = m.stage_id
LEFT JOIN dialogs d ON m.id = d.mission_id
LEFT JOIN sql_queries q ON d.id = q.dialog_id
ORDER BY s.id, m.id, d.id, q.id;
```
