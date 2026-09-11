import type { GameChoice } from "./choices";

export function resolveAction(
  choice: GameChoice
) {
  if ("response" in choice) {
    return;
  }

  // Actions will eventually contain
  // special game logic that cannot be
  // handled by the choice itself.
  console.log(`Action: ${choice.action}`);
}