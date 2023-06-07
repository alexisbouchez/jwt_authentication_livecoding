export function getDisplayName(
  firstName: string,
  lastName: string,
  city?: string
): string {
  if (city) {
    return `[${city}] ${firstName} ${lastName}`;
  }

  return `[?] ${firstName} ${lastName}`;
}
