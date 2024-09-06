export function validateLoginBody(
  email: string | undefined,
  password: string | undefined
): [string, string, boolean, string] {
  if (email === undefined || password === undefined) {
    return ["", "", false, "email or password is missing"];
  }

  if (email.trim() === "" || password.trim() === "") {
    return [
      "",
      "",
      false,
      "name, email, institution or password should not be empty",
    ];
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    ["", "", false, "email is not in valid format"];
  }

  if (password.length < 8) {
    return [
      "",
      "",
      false,
      "password must be more than or equal 8 characters long",
    ];
  }

  return [email, password, true, ""];
}
