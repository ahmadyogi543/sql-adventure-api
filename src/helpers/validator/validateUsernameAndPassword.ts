export function validateUsernameAndPassword(
  username: string | undefined,
  password: string | undefined
): [string, string, boolean, string] {
  if (username === undefined || password === undefined) {
    return ["", "", false, "username or password is missing"];
  }

  if (username.trim() === "" || password.trim() === "") {
    return ["", "", false, "username or password should not be empty"];
  }

  if (username.length < 3 || username.length > 15) {
    return ["", "", false, "username must be between 3 and 15 characters long"];
  }

  if (password.length < 8) {
    return [
      "",
      "",
      false,
      "password must be more than or equal 8 characters long",
    ];
  }

  const regex = /^[a-zA-Z0-9._]+$/;
  if (!regex.test(username)) {
    return [
      "",
      "",
      false,
      "username can only contain letters, numbers, underscores, and periods",
    ];
  }

  return [username, password, true, ""];
}
