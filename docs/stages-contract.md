# SQL Adventure API Contract (STAGES)

This is the contract for STAGES route for SQL Adventure API

## HTTP GET /stages (200 OK)

Retrieve all stages

headers:

- Authorization: Bearer `<Base64 JWT Token>`

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved all stages successfully",
  "data": {
    "stages": [
      {
        "id": 1,
        "title": "Judul Tingkatan",
        "introduction": "Berisikan pengenalan cerita",
        "closing": "Berisikan kata penutup cerita",
        "db_name": "contoh.db",
        "missions": [
          {
            "mission_id": 1,
            "title": "Judul Misi",
            "dialogs": [
              {
                "type": "narration",
                "text": "Berisikan narasi cerita",
                "query": null
              },
              {
                "type": "instruction",
                "text": "Berisikan perintah menulis",
                "query": {
                  "type": "read",
                  "text": "SELECT * FROM nothing",
                  "validation": null
                }
              },
              {
                "type": "instruction",
                "text": "Berisikan perintah menulis",
                "query": {
                  "type": "write",
                  "text": "DELETE FROM nothing WHERE everything = 'possible'",
                  "validation": "SELECT * FROM nothing WHERE everything = 'possible'"
                }
              },
              {
                "type": "narration",
                "text": "Berisikan narasi cerita",
                "query": null
              }
            ]
          }
          // more...
        ]
      }
      // more...
    ]
  }
}
```

## HTTP GET /stages/:id (200 OK)

Retrieve one stage

headers:

- Authorization: Bearer `<Base64 JWT Token>`

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved one stage successfully",
  "data": {
    "stage": {
      "id": 1,
      "title": "Judul Tingkatan",
      "introduction": "Berisikan pengenalan cerita",
      "closing": "Berisikan kata penutup cerita",
      "db_name": "contoh.db",
      "missions": [
        {
          "mission_id": 1,
          "title": "Judul Misi",
          "dialogs": [
            {
              "type": "narration",
              "text": "Berisikan narasi cerita",
              "query": null
            },
            {
              "type": "instruction",
              "text": "Berisikan perintah menulis",
              "query": {
                "type": "read",
                "text": "SELECT * FROM nothing",
                "validation": null
              }
            },
            {
              "type": "instruction",
              "text": "Berisikan perintah menulis",
              "query": {
                "type": "write",
                "text": "DELETE FROM nothing WHERE everything = 'possible'",
                "validation": "SELECT * FROM nothing WHERE everything = 'possible'"
              }
            },
            {
              "type": "narration",
              "text": "Berisikan narasi cerita",
              "query": null
            }
          ]
        }
        // more...
      ]
    }
  }
}
```

## HTTP GET /stages/head (200 OK)

Retrieve all the head of stages (id and title)

headers:

- Authorization: Bearer `<Base64 JWT Token>`

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved all head stages successfully",
  "data": {
    "head_stages": [
      {
        "id": 1,
        "title": "Judul Tingkatan"
      },
      {
        "id": 2,
        "title": "Judul Tingkatan"
      }
    ]
  }
}
```
