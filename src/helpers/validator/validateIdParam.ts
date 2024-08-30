export function validateIdParam(
  id: string | undefined
): [number, boolean, string] {
  if (id === undefined) {
    return [0, false, "id is missing"];
  }

  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) {
    return [0, false, "invalid id format, should be numeric"];
  }
  if (parsedId <= 0) {
    return [0, false, "invalid id, should be greater than 0"];
  }

  return [parsedId, true, ""];
}
