# SQL Adventure API Contract (USERS)

This is the contract for USERS route for SQL Adventure API

## HTTP GET /users (200 OK)

retrieve all registered users

headers:

- Authorization: Bearer `<Base64 JWT Token>`

additional informations:

- restricted for admin

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved all users successfully",
  "data": {
    "users": [
      {
        "id": 2,
        "username": "cristiano",
        "role": "user"
      },
      {
        "id": 3,
        "username": "kmbappe",
        "role": "user"
      }
    ]
  }
}
```

## HTTP GET /users/:id (200 OK)

retrieve one registered user

headers:

- Authorization: Bearer `<Base64 JWT Token>`

additional informations:

- use the id from logged-in user

on success response:

```jsonc
{
  "status": "success",
  "message": "retrieved one user successfully",
  "data": {
    "user": {
      "id": 2,
      "username": "cristiano",
      "role": "user"
    }
  }
}
```

## HTTP DELETE /users/:id (204 No Content)

remove one registered user

headers:

- Authorization: Bearer `<Base64 JWT Token>`

additional informations:

- use the id from logged-in user

on success response:

```jsonc
{}
```
