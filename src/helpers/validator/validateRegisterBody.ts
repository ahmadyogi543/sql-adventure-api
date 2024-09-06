export function validateRegisterBody(
  name: string | undefined,
  email: string | undefined,
  institution: string | undefined,
  password: string | undefined
): [string, string, string, string, boolean, string] {
  if (
    name === undefined ||
    email === undefined ||
    institution === undefined ||
    password === undefined
  ) {
    return [
      "",
      "",
      "",
      "",
      false,
      "name, email, institution or password is missing",
    ];
  }

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    institution.trim() === "" ||
    password.trim() === ""
  ) {
    return [
      "",
      "",
      "",
      "",
      false,
      "name, email, institution or password should not be empty",
    ];
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    ["", "", "", "", false, "email is not in valid format"];
  }

  if (password.length < 8) {
    return [
      "",
      "",
      "",
      "",
      false,
      "password must be more than or equal 8 characters long",
    ];
  }

  return [name, email, institution, password, true, ""];
}
