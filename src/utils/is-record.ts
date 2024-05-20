export function isRecord(obj: unknown): obj is Record<string, any> {
  if (typeof obj !== "object") return false;
  if (obj === null) return false;
  if (Array.isArray(obj)) return false;
  return obj.constructor === Object;
}

export function isEmptyRecord(obj: unknown): boolean {
  if (!isRecord(obj)) {
    return false;
  }

  return Object.keys(obj).length === 0;
}
