/**
 * Validates that required environment variables are present.
 * Throws a descriptive error if any are missing.
 */
export function requireEnv(name: string, hint?: string): string {
  const value = process.env[name];
  if (!value) {
    const message = hint
      ? `${name} must be set. ${hint}`
      : `${name} must be set.`;
    throw new Error(message);
  }
  return value;
}
