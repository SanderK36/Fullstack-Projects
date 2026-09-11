"use client";

import { useState } from "react";
import player from "@/game/player";
import initialGameState from "@/game/gameState";
import GameStatus from "@/components/GameStatus/GameStatus";
import ActionList from "@/components/ActionList/ActionList";
import {
  getNextDay,
  getDaysInMonth,
  getNextMonth,
  isNightTime,
} from "@/game/utils";
import { advanceTime } from "@/game/time";
import StatsWindow from "@/components/StatsWindow/StatsWindow";
import StoryLog from "@/components/StoryLog/StoryLog";
import {
  morningAtHome,
  lookingAroundHouse,
  madeCoffee,
  leftHouse,
  livingRoom,
  talkingToMom,
  momSaidMorning,
} from "@/game/scenes";
import { resolveAction } from "@/game/actions";
import { applyEffects } from "@/game/effects";
import type { StoryEntry } from "@/game/story";
import CharacterLine from "@/components/CharacterLine/CharacterLine";
import ActionButton from "@/components/ActionButton/ActionButton";

export default function Home() {
  const [gameState, setGameState] = useState(initialGameState);
  const [playerState, setPlayerState] = useState(player);
  const [showStats, setShowStats] = useState(false);

  const [storyText, setStoryText] = useState<StoryEntry[]>(
    morningAtHome.story.filter(
      (entry) => entry.type !== "thought"
    )
  );

  const [currentScene, setCurrentScene] =
    useState(morningAtHome);

  const [currentThought, setCurrentThought] =
    useState<string | null>(
      morningAtHome.story.find(
        (entry) => entry.type === "thought"
      )?.text ?? null
    );

  const scenes = {
    "morning-at-home": morningAtHome,
    "looking-around-house": lookingAroundHouse,
    "made-coffee": madeCoffee,
    "left-house": leftHouse,
    "living-room": livingRoom,
    "talking-to-mom": talkingToMom,
    "mom-said-morning": momSaidMorning,
  };

  function getThought(sceneId: string, time: number) {
    if (sceneId === "living-room") {
      if (time < 1080) {
        return "Mom is here.";
      }

      return "It's quiet in here when Mom's at work.";
    }

    const scene =
      scenes[sceneId as keyof typeof scenes];

    if (!scene) {
      return null;
    }

    return (
      scene.story.find(
        (entry) => entry.type === "thought"
      )?.text ?? null
    );
  }

  function handleAdvanceTime(minutes: number) {
    const timeResult = advanceTime(
      gameState.time,
      minutes
    );

    let newGameState = {
      ...gameState,
      time: timeResult.time,
    };

    if (timeResult.dayChanged) {
      if (
        gameState.dayNumber ===
        getDaysInMonth(gameState.currentMonth)
      ) {
        newGameState = {
          ...newGameState,
          dayNumber: 1,
          dayOfWeek: getNextDay(
            gameState.dayOfWeek
          ),
          currentMonth: getNextMonth(
            gameState.currentMonth
          ),
        };
      } else {
        newGameState = {
          ...newGameState,
          dayNumber:
            gameState.dayNumber + 1,
          dayOfWeek: getNextDay(
            gameState.dayOfWeek
          ),
        };
      }
    }

    setGameState(newGameState);

    setCurrentThought(
      getThought(
        currentScene.id,
        newGameState.time
      )
    );
  }

  function lookAround() {}

  function makeCoffee() {}

  function leaveHouse() {}

  function goHome() {}

  function goLivingRoom() {}

  function talkToMom() {}
  
  function sayMorningToMom() {}
  
  function askMomAboutSleep() {}
  
  function tellMomLeaving() {}

  function wait(minutes: number) {
    handleAdvanceTime(minutes);
  }

  function setCurrentSceneById(sceneId: string) {
  const scene =
    scenes[sceneId as keyof typeof scenes];

  if (!scene) {
    return;
  }

  setCurrentScene(scene);

  setCurrentThought(
    getThought(
      scene.id,
      gameState.time
    )
  );

  setGameState((previousGameState) => ({
    ...previousGameState,
    location: scene.location,
  }));

  const newStory = scene.story.filter(
    (entry) => entry.type !== "thought"
  );

  const isConversation = newStory.some(
    (entry) => entry.type === "conversation"
  );

  if (isConversation) {
    setStoryText((previousStory) => [
      ...previousStory,
      ...newStory,
    ]);
  } else {
    setStoryText(newStory);
  }
}

  const choices = currentScene.choices.filter(
    (choice) => {
      if (
        choice.action === "talkToMom" &&
        gameState.time >= 1080
      ) {
        return false;
      }

      return true;
    }
  );

  return (
    <main className="game">
      <div className="game-panel">

        <h1>HARLOW</h1>

        <GameStatus
          player={playerState}
          gameState={gameState}
          onStatsClick={() =>
            setShowStats(true)
          }
        />

        <img
          src={
            isNightTime(gameState.time)
              ? currentScene.image.night
              : currentScene.image.day
          }
          alt=""
          className="scene-image"
        />

        <StoryLog entries={storyText} />

        {currentThought && (
          <CharacterLine
            key={currentThought}
            text={currentThought}
          />
        )}

        {showStats && (
          <StatsWindow
            player={playerState}
            onClose={() =>
              setShowStats(false)
            }
          />
        )}

        <ActionList
          title="What do you want to do?"
          choices={choices}
          onChoice={(choice) => {

            resolveAction(choice.action, {
              lookAround,
              makeCoffee,
              leaveHouse,
              goHome,
              goLivingRoom,
              talkToMom,
              sayMorningToMom,
              askMomAboutSleep,
              tellMomLeaving,
            });

            handleAdvanceTime(
              choice.timeCost
            );

            if (choice.effects) {
              setPlayerState(
                (previousPlayer) =>
                  applyEffects(
                    previousPlayer,
                    choice.effects!
                  )
              );
            }

            setCurrentSceneById(
              choice.nextScene
            );
          }}
        />

        {/* Temporary testing buttons */}

        <div>
          <ActionButton
            label="Wait 1 min"
            onClick={() => wait(1)}
          />

          <ActionButton
            label="Wait 5 min"
            onClick={() => wait(5)}
          />

          <ActionButton
            label="Wait 10 min"
            onClick={() => wait(10)}
          />

          <ActionButton
            label="Wait 30 min"
            onClick={() => wait(30)}
          />

          <ActionButton
            label="Wait 1 hour"
            onClick={() => wait(60)}
          />
        </div>

      </div>
    </main>
  );
}