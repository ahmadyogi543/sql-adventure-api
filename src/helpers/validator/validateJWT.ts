export function validateJWT(
  token: string | undefined
): [string, boolean, string] {
  if (token === undefined) {
    return ["", false, "token is missing"];
  }

  if (token.trim() === "") {
    return ["", false, "token should not be empty"];
  }

  return [token, true, ""];
}
