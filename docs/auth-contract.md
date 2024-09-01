# SQL Adventure API Contract (AUTH)

This is the contract for AUTH route for SQL Adventure API

## HTTP POST /auth/register (201 Created)

Register a user with username and password

body:

- username: string
- password: string

success response:

```jsonc
{
  "status": "success",
  "message": "registered user with id cristiano successfully",
  "data": {
    "user": {
      "id": 3,
      "username": "cristiano",
      "role": "user"
    }
  }
}
```

## HTTP POST /auth/login (200 OK)

Logged the user in with username and password

body:

- username: string
- password: string

success response:

```jsonc
{
  "status": "success",
  "message": "login successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJjcmlzdGlhbm8iLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNTE5NDQ1OSwiZXhwIjoxNzI1MTk4MDU5fQ.Ev7aT9pgIo0E5EDz-_csWoxrxEhmxO6JJkk6A51kOk0"
  }
}
```

## HTTP DELETE /auth/logout (204 No Content)

Logged the user out

headers:

- Authorization: Bearer `<Base64 JWT Token>`
