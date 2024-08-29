# SQL Adventure API Contract (USERS)

- HTTP GET /users (200 OK)

```jsonc
{
  "data": {
    "users": [
      {
        "id": 1,
        "username": "cristiano",
        "email": "cristiano@siuu.com",
        "password_hash": "$2a$12$DEuGB9gI.R2vAhW1z77ajuQPyyD8Wrs95.MwqMFA4mltgoNupl8y6",
        "score": 100
      }
      // ...
    ]
  },
  "message": "retrieved all users successfully",
  "status": "success"
}
```

- HTTP GET /users/:id (200 OK)

```jsonc
{
  "data": {
    "user": {
      "id": 1,
      "username": "cristiano",
      "email": "cristiano@siuu.com",
      "password_hash": "$2a$12$DEuGB9gI.R2vAhW1z77ajuQPyyD8Wrs95.MwqMFA4mltgoNupl8y6",
      "score": 100
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
        "userId": 1,
        "progress": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        "last_played": "2023-12-31 23:59:59"
      },
      {
        "userId": 2,
        "progress": [100, 100, 50],
        "last_played": "2023-08-21 23:59:59"
      }
      // ...
    ]
  },
  "message": "retrieved all users progress successfully",
  "status": "success"
}
```

- HTTP GET /users/progress/:user_id (200 OK)

```jsonc
{
  "data": {
    "user_progress": {
      "userId": 1,
      "progress": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      "last_played": "2023-12-31 23:59:59"
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
