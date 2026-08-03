export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase()
}

export function displayName(username: string): string {
  const name = normalizeUsername(username)
  return name.charAt(0).toUpperCase() + name.slice(1)
}