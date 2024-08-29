# SQL Adventure API Contract (STAGES)

- HTTP GET /stages (200 OK)

```jsonc
{
  "data": {
    "stages": [
      {
        "id": 1,
        "title": "Menjelajah Pulau Kembang",
        "introduction": "Selamat datang di Pulau Kembang! Kamu...",
        "closing": "Selamat! Kamu telah menyelesaikan semua misi...",
        "db_name": "stage1.db",
        "missions": [
          {
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
                  "query": "SELECT * FROM biaya",
                  "validation": null
                }
              }
              // ...
            ]
          }
          // ...
        ]
      }
    ]
  },
  "message": "retrieved all stages successfully",
  "status": "success"
}
```

- HTTP GET /stages/:id (200 OK)

```jsonc
{
  "data": {
    "stage": {
      "id": 1,
      "title": "Menjelajah Pulau Kembang",
      "introduction": "Selamat datang di Pulau Kembang! Kamu...",
      "closing": "Selamat! Kamu telah menyelesaikan semua misi...",
      "db_name": "stage1.db",
      "missions": [
        {
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
                "query": "SELECT * FROM biaya",
                "validation": null
              }
            }
            // ...
          ]
        }
        // ...
      ]
    }
  },
  "message": "retrieved one stage successfully",
  "status": "success"
}
```

- HTTP GET /stages/head (200 OK)

```jsonc
{
  "data": {
    "head_stages": [
      {
        "id": 1,
        "title": "Menjelajah Pulau Kembang"
      }
      // ...
    ]
  },
  "message": "retrieved all head stages successfully",
  "status": "success"
}
```

- DATA DEFINITION

```sql
-- create stages table
CREATE TABLE IF NOT EXISTS stages (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    introduction TEXT NOT NULL,
    closing TEXT NOT NULL,
    db_name TEXT
);

-- create missions table
CREATE TABLE IF NOT EXISTS missions (
    id INTEGER PRIMARY KEY,
    stage_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (stage_id) REFERENCES stages(id) ON DELETE CASCADE
);

-- create dialogs table
CREATE TABLE IF NOT EXISTS dialogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('narration', 'instruction')),
    text TEXT NOT NULL,
    FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
);

-- create queries table
CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dialog_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('read', 'write')),
    text TEXT NOT NULL,
    validation TEXT,
    FOREIGN KEY (dialog_id) REFERENCES dialogs(id) ON DELETE CASCADE
)
```
