export function validateIdParam(id: number): [valid: boolean, message: string] {
  if (Number.isNaN(id)) {
    return [false, "invalid id format, should be numeric"];
  }
  if (id <= 0) {
    return [false, "invalid id, should be greater than 0"];
  }

  return [true, ""];
}

export function validateUsernameAndPassword(
  username: string | undefined,
  password: string | undefined
): [boolean, string] {
  if (username === undefined || password === undefined) {
    return [false, "username or password is missing"];
  }

  if (username.trim() === "" || password.trim() === "") {
    return [false, "username or password should not be empty"];
  }

  if (username.length < 3 || username.length > 15) {
    return [false, "username must be between 3 and 15 characters long"];
  }

  if (password.length < 8) {
    return [false, "password must be more than or equal 8 characters long"];
  }

  const regex = /^[a-zA-Z0-9._]+$/;
  if (!regex.test(username)) {
    return [
      false,
      "username can only contain letters, numbers, underscores, and periods",
    ];
  }

  return [true, ""];
}
