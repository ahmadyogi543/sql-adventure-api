export function validateIDParam(
  id: string | undefined
): [number, boolean, string] {
  if (id === undefined) {
    return [0, false, "is missing"];
  }

  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) {
    return [0, false, "invalid format, should be numeric"];
  }
  if (parsedId <= 0) {
    return [0, false, "invalid, should be greater than 0"];
  }

  return [parsedId, true, ""];
}

export function validateNumber(
  id: string | undefined
): [number, boolean, string] {
  if (id === undefined) {
    return [0, false, "is missing"];
  }

  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) {
    return [0, false, "invalid format, should be numeric"];
  }

  return [parsedId, true, ""];
}
