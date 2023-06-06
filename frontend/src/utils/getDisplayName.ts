export function getDisplayName(
  firstName: string,
  lastName: string,
  city?: string
): string {
  if (!city) {
    return `[?] ${firstName} ${lastName}`;
  }

  return `[${city}] ${firstName} ${lastName}`;
}
