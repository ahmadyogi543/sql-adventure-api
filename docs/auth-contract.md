# SQL Adventure API Contract (AUTH)

- HTTP POST /auth/register (201 Created)

```jsonc
// body
{
  "id": 1,
  "username": "ahmadyogi"
}

// response
{
    "status": "success",
    "message": "registered user with id ahmadyogi successfully",
    "data": {
        "user": {
            "id": 1,
            "username": "ahmadyogi"
        }
    }
}
```

- HTTP POST /auth/login (200 OK)

```jsonc
// body
{
  "id": 1,
  "username": "ahmadyogi"
}

// response
{
    "status": "success",
    "message": "login successfully",
    "data": {
        "token": "<base64 jwt token>"
    }
}
```

- HTTP POST /auth/logout (204 No Content)

header: `Authorization: Bearer <Base64 JWT Token>`

```jsonc
// no body

```
