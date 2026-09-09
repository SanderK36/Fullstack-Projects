"use client"
import { useState } from "react";
import player from "@/game/player";
import initialGameState from "@/game/gameState";
import GameStatus from "@/components/GameStatus/GameStatus";
import ActionButton from "@/components/ActionButton/ActionButton";
import ActionList from "@/components/ActionList/ActionList";
import { getNextDay, getDaysInMonth, getNextMonth } from "@/game/utils";
import { advanceTime } from "@/game/time";
import { time } from "console";


export default function Home() {
  const [gameState, setGameState] = useState(initialGameState);
  const [playerState, setPlayerState] = useState(player)

  function handleAdvanceTime(minutes: number) {
    const timeResult = advanceTime(gameState.time, minutes);

    if (timeResult.dayChanged) {

      if(gameState.dayNumber === getDaysInMonth(gameState.currentMonth)) {
        const nextMonth = getNextMonth(gameState.currentMonth)

        setGameState({
          ...gameState,
          dayNumber: 1,
          dayOfWeek: getNextDay(gameState.dayOfWeek),
          currentMonth: nextMonth,
          time: timeResult.time,
        });

        return;

      }

      setGameState({
        ...gameState,
        dayNumber: gameState.dayNumber + 1,
        dayOfWeek: getNextDay(gameState.dayOfWeek),
        time: timeResult.time,
      });
    } else {

      setGameState({
        ...gameState,
        time: timeResult.time,
      })
    }
}
  return (
    <main>
      <h1>HARLOW</h1>
      <GameStatus player={playerState} gameState={gameState} />
      <ActionList title="What do you want to do?">
        <ActionButton label="Wait 5 min" onClick={() => handleAdvanceTime(5)}/>
        <ActionButton label="Wait 15 min" onClick={() => handleAdvanceTime(15)}/>
        <ActionButton label="Wait 30 min" onClick={() => handleAdvanceTime(30)}/>
        <ActionButton label="Wait 60 min" onClick={() => handleAdvanceTime(60)}/>
      </ActionList>
    </main>
  );
}
