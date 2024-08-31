# SQL Adventure API Contract (USERS)

- HTTP GET /users (200 OK)

header: `Authorization: Bearer <Base64 JWT Token>`

```jsonc
{
  "data": {
    "users": [
      {
        "id": 1,
        "username": "cristiano",
        "email": "cristiano@siuu.com",
        "password_hash": "$2a$12$DEuGB9gI.R2vAhW1z77ajuQPyyD8Wrs95.MwqMFA4mltgoNupl8y6",
        "role": "user"
      }
      // ...
    ]
  },
  "message": "retrieved all users successfully",
  "status": "success"
}
```

- HTTP GET /users/:id (200 OK)

header: `Authorization: Bearer <Base64 JWT Token>`

```jsonc
{
  "data": {
    "user": {
      "id": 1,
      "username": "messi",
      "email": "messi@ankara.com",
      "password_hash": "$2a$12$DEuGB9gI.R2vAhW1z77ajuQPyyD8Wrs95.MwqMFA4mltgoNupl8y6",
      "role": "admin"
    }
  },
  "message": "retrieved one user successfully",
  "status": "success"
}
```

- HTTP GET /users/progress (200 OK)

```jsonc
{
  "data": {
    "users_progress": [
      {
        "user_id": 1,
        "values": [
          {
            "stage_id": 1,
            "no_of_missions": 10,
            "missions_attempted": [
              {
                "attempt": 3,
                "scores": [20, 30, 60],
                "last_attempted": "2024-08-31 02:05:02"
              },
              {
                "attempt": 2,
                "scores": [80, 60],
                "last_attempted": "2024-08-31 02:05:02"
              }
              // ...
            ],
            "last_attempted": "2024-08-31 02:05:02"
          }
          // ...
        ]
      },
      {
        "user_id": 2,
        "values": [
          {
            "stage_id": 1,
            "no_of_missions": 10,
            "missions_attempted": [
              {
                "attempt": 2,
                "scores": [80, 100],
                "last_attempted": "2024-08-31 02:05:02"
              },
              {
                "attempt": 1,
                "scores": [100],
                "last_attempted": "2024-08-31 02:05:02"
              }
              // ...
            ],
            "last_attempted": "2024-08-31 02:05:02"
          }
          // ...
        ]
      }
      // ...
    ]
  },
  "message": "retrieved all users progress successfully",
  "status": "success"
}
```

- HTTP GET /users/progress/:user_id (200 OK)

header: `Authorization: Bearer <Base64 JWT Token>`

```jsonc
{
  "data": {
    "user_progress": {
      "user_id": 1,
      "values": [
        {
          "stage_id": 1,
          "no_of_missions": 10,
          "missions_attempted": [
            {
              "attempt": 3,
              "scores": [20, 30, 60],
              "last_attempted": "2024-08-31 02:05:02"
            },
            {
              "attempt": 2,
              "scores": [80, 60],
              "last_attempted": "2024-08-31 02:05:02"
            }
            // ...
          ],
          "last_attempted": "2024-08-31 02:05:02"
        }
        // ...
      ]
    }
  },
  "message": "retrieved one user progress successfully",
  "status": "success"
}
```

- DATA DEFINITION

```sql
-- create users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0
);

-- create progresses table
CREATE TABLE IF NOT EXISTS progresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  users_id INTEGER NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  last_played TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);

```
