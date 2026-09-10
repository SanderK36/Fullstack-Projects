export type GameActions = {
  lookAround: () => void;
  makeCoffee: () => void;
  leaveHouse: () => void;
  goHome: () => void;
};

export function resolveAction(
  action: string,
  actions: GameActions
) {
  const gameAction = actions[action as keyof GameActions];

  if (!gameAction) {
    return;
  }

  gameAction();
}