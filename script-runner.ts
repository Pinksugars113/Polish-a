/**
 * Shared utility for running one-off database scripts (seed, import, etc.)
 * with consistent error handling and process exit behavior.
 */
export function runScript(
  name: string,
  fn: () => Promise<void>
): void {
  fn().catch((err) => {
    console.error(`${name} failed:`, err);
    process.exit(1);
  });
}
