import type { GameState } from "./types";
import {
  getNextDay,
  getDaysInMonth,
  getNextMonth,
} from "./utils";

export function advanceTime(
  currentTime: number,
  minutes: number
) {
  const newTime = currentTime + minutes;

  if (newTime >= 1440) {
    const timeAfterMidnight =
      newTime - 1440;

    return {
      time: timeAfterMidnight,
      dayChanged: true,
    };
  }

  return {
    time: newTime,
    dayChanged: false,
  };
}

export function advanceGameTime(
  gameState: GameState,
  minutes: number
): GameState {
  const timeResult = advanceTime(
    gameState.time,
    minutes
  );

  const newGameState = {
    ...gameState,
    time: timeResult.time,
  };

  if (!timeResult.dayChanged) {
    return newGameState;
  }

  if (
    gameState.dayNumber ===
    getDaysInMonth(gameState.currentMonth)
  ) {
    return {
      ...newGameState,
      dayNumber: 1,
      dayOfWeek: getNextDay(
        gameState.dayOfWeek
      ),
      currentMonth: getNextMonth(
        gameState.currentMonth
      ),
    };
  }

  return {
    ...newGameState,
    dayNumber:
      gameState.dayNumber + 1,
    dayOfWeek: getNextDay(
      gameState.dayOfWeek
    ),
  };
}