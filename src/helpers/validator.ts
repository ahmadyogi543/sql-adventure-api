export function validateIdParam(id: number): [valid: boolean, message: string] {
  if (Number.isNaN(id)) {
    return [false, "invalid id format, should be numeric"];
  }
  if (id <= 0) {
    return [false, "invalid id, should be greater than 0"];
  }

  return [true, ""];
}
