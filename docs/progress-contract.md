# SQL Adventure API Contract (USERS PROGRESS)

This is the contract for USERS PROGRESS route for SQL Adventure API

## HTTP GET /users/progress (200 OK)

Get all users progress

headers:

- Authorization: Bearer `<Base64 JWT Token>`

additional informations:

- restricted for admin

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved all users progress successfully",
  "data": {
    "users_progress": [
      {
        "user_id": 2,
        "values": [
          {
            "stage_id": 1,
            "no_of_missions": 10,
            "last_attempted": "2024-09-01 20:27:51",
            "missions_attempted": [
              {
                "mission_id": 1,
                "attempt": 1,
                "last_attempted": "2024-09-01 20:27:23",
                "scores": [100]
              }
            ]
          }
        ]
      },
      {
        "user_id": 3,
        "values": []
      }
    ]
  }
}
```

## HTTP GET /users/progress/:user_id (200 OK)

Get one user progress

headers:

- Authorization: Bearer `<Base64 JWT Token>`

additional informations:

- for user, must use the id from logged in user

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved one user progress successfully",
  "data": {
    "user_progress": {
      "user_id": 2,
      "values": [
        {
          "stage_id": 1,
          "no_of_missions": 10,
          "last_attempted": "2024-09-01 20:27:51",
          "missions_attempted": [
            {
              "mission_id": 1,
              "attempt": 2,
              "last_attempted": "2024-09-01 20:27:23",
              "scores": [100, 80]
            }
          ]
        }
      ]
    }
  }
}
```

## HTTP POST /users/progress/:user_id (204 No Content)

Initializing user progress

headers:

- Authorization: Bearer `<Base64 JWT Token>`

body:

- stage_id: number
- no_of_missions: number

additional informations:

- restricted for user
- use the id from logged-in user

on success response:

```jsonc
// no content
```

## HTTP PUT /users/progress/:user_id (204 No Content)

Update the date and time of the last time the user accessed a stage

headers:

- Authorization: Bearer `<Base64 JWT Token>`

body:

- stage_id: number

additional informations:

- restricted for user
- use the id from logged-in user

on success response:

```jsonc
// no content
```

## HTTP DELETE /users/progress/:user_id (204 No Content)

Reset the user progress

headers:

- Authorization: Bearer `<Base64 JWT Token>`

body:

- stage_id: number

additional informations:

- restricted for user
- use the id from logged-in user

on success response:

```jsonc
// no content
```

## HTTP POST /users/progress/:user_id/attempt (204 No Content)

Add the information like score and date and time and increment attempt on a mission

headers:

- Authorization: Bearer `<Base64 JWT Token>`

body:

- stage_id: number
- mission_id: number
- score: number

additional informations:

- restricted for user
- use the id from logged-in user

on success response:

```jsonc
// no content
```
