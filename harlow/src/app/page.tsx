"use client"

import { useState } from "react";
import player from "@/game/player";
import initialGameState from "@/game/gameState";
import GameStatus from "@/components/GameStatus/GameStatus";
import ActionList from "@/components/ActionList/ActionList";
import { getNextDay, getDaysInMonth, getNextMonth, isNightTime, } from "@/game/utils";
import { advanceTime } from "@/game/time";
import StatsWindow from "@/components/StatsWindow/StatsWindow";
import StoryLog from "@/components/StoryLog/StoryLog";
import { morningAtHome, lookingAroundHouse, madeCoffee, leftHouse } from "@/game/scenes";
import { resolveAction } from "@/game/actions";
import { applyEffects } from "@/game/effects";
import type { StoryEntry } from "@/game/story";
import ActionButton from "@/components/ActionButton/ActionButton";


export default function Home() {
  const [gameState, setGameState] = useState(initialGameState);
  const [playerState, setPlayerState] = useState(player);
  const [showStats, setShowStats] = useState(false);
  const [storyText, setStoryText] = useState<StoryEntry[]>([
    {
      type: "narration",
      text: morningAtHome.text,
    }
  ]);
  const [currentScene, setCurrentScene] = useState(morningAtHome);

  function handleAdvanceTime(minutes: number) {
    const timeResult = advanceTime(gameState.time, minutes);

    if (timeResult.dayChanged) {

      if (gameState.dayNumber === getDaysInMonth(gameState.currentMonth)) {
        const nextMonth = getNextMonth(gameState.currentMonth);

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
      });
    }
  }

  function lookAround() {}

  function makeCoffee() {}

  function leaveHouse() {}

  function waitOneHour() {
  handleAdvanceTime(60);
}

  const choices = currentScene.choices;

  const scenes = {
  "morning-at-home": morningAtHome,
  "looking-around-house": lookingAroundHouse,
  "made-coffee": madeCoffee,
  "left-house": leftHouse,
};

function setCurrentSceneById(sceneId: string) {
  const scene = scenes[sceneId as keyof typeof scenes];

  if (!scene) {
    return;
  }

  setCurrentScene(scene);
  
  setGameState((previousGameState) => ({
    ...previousGameState,
    location: scene.location,
  }));

  setStoryText((previousStory) => [
    ...previousStory,
    {
      type: "narration",
      text: scene.text,
    }
  ]);
}
  return (
    <main className="game">
      <div className="game-panel">
        <h1>HARLOW</h1>

        <GameStatus player={playerState} gameState={gameState} onStatsClick={() => setShowStats(true)}/>
        <img src={isNightTime(gameState.time) ? currentScene.image.night : currentScene.image.day} alt="" className="scene-image" />
        <StoryLog entries={storyText} />
        {showStats && (<StatsWindow player={playerState} onClose={() => setShowStats(false)}/>)}
        <ActionList
        title="What do you want to do?"
        choices={choices}
        onChoice={(choice) => {
          resolveAction(choice.action, {
            lookAround,
            makeCoffee,
            leaveHouse,
          })
          handleAdvanceTime(choice.timeCost);

          if (choice.effects) {
            setPlayerState((previousPlayer) =>
              applyEffects(previousPlayer, choice.effects!)
          );

            Object.entries(choice.effects).forEach(([stat, amount]) => {
              setStoryText((previousStory) => [
                ...previousStory,
                {
                  type:"effect",
                  stat: stat as "health" | "stamina" | "fear" | "money",
                  amount,
                },
              ]);
            });
          }
          setCurrentSceneById(choice.nextScene);
        }}/>

        {gameState.location === "Home front yard" && (
  <ActionButton
    label="Wait 1 hour"
    onClick={waitOneHour}
  />
)}
      </div>
    </main>
  );
}