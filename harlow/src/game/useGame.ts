import { useState } from "react";

import player from "@/game/player";
import initialGameState from "@/game/gameState";

import { advanceGameTime } from "@/game/time";

import {
  scenes,
  hallway,
  momConversation,
  getSceneThought,
} from "@/game/scenes";

import { resolveAction } from "@/game/actions";

import {
  applyEffects,
  effectsToStory,
} from "@/game/effects";

import type { StoryEntry } from "@/game/story";
import type { GameChoice } from "@/game/choices";

export function useGame() {
  const [gameState, setGameState] =
    useState(initialGameState);

  const [playerState, setPlayerState] =
    useState(player);

  const [showStats, setShowStats] =
    useState(false);

  const [conversation, setConversation] =
    useState<StoryEntry[]>([]);

  const [conversationActive, setConversationActive] =
    useState(false);

  const [storyText, setStoryText] =
    useState<StoryEntry[]>(
      hallway.story.filter(
        (entry) => entry.type !== "thought"
      )
    );

  const [currentScene, setCurrentScene] =
    useState(hallway);

  const [currentThought, setCurrentThought] =
    useState<string | null>(
      getSceneThought(
        hallway.id,
        initialGameState.time
      )
    );

  const [currentEffects, setCurrentEffects] =
    useState<StoryEntry[]>([]);

  function handleAdvanceTime(minutes: number) {
    const newGameState =
      advanceGameTime(
        gameState,
        minutes
      );

    setGameState(newGameState);

    setCurrentThought(
      getSceneThought(
        currentScene.id,
        newGameState.time
      )
    );
  }

  function setCurrentSceneById(
    sceneId: string
  ) {
    const scene =
      scenes[
        sceneId as keyof typeof scenes
      ];

    if (!scene) {
      return;
    }

    setCurrentScene(scene);

    setCurrentEffects([]);

    const newStory =
      scene.story.filter(
        (entry) =>
          entry.type !== "thought"
      );

    setStoryText(newStory);

    setCurrentThought(
      getSceneThought(
        scene.id,
        gameState.time
      )
    );

    setGameState(
      (previousGameState) => ({
        ...previousGameState,
        location: scene.location,
      })
    );
  }

  function handleChoice(
    choice: GameChoice
  ) {
    // Conversation choice
    if ("response" in choice) {
      setConversation(
        (previousConversation) => [
          ...previousConversation,
          ...choice.response,
        ]
      );

      if (choice.endsConversation) {
        setTimeout(() => {
          setConversation([]);
          setConversationActive(false);
        }, 2000);
      }

      return;
    }

    // Start a conversation
    if (choice.action === "talkToMom") {
      setConversation(
        momConversation.opening
      );

      setConversationActive(true);
    }

    // Resolve special action logic
    resolveAction(choice);

    // Advance time
    handleAdvanceTime(
      choice.timeCost
    );

    // Change scene
    setCurrentSceneById(
      choice.nextScene
    );

    // Apply effects
    const effects = choice.effects;

    if (effects) {
      setPlayerState(
        (previousPlayer) =>
          applyEffects(
            previousPlayer,
            effects
          )
      );

      setCurrentEffects(
        effectsToStory(effects)
      );
    }
  }

  const choices =
    currentScene.choices.filter(
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

  const conversationChoices =
    currentScene.conversation?.choices ?? [];

  const activeChoices =
    conversationActive
      ? conversationChoices
      : choices;

  return {
    gameState,
    playerState,
    currentScene,
    currentThought,
    currentEffects,
    conversation,
    activeChoices,

    showStats,
    setShowStats,

    handleChoice,

    wait: handleAdvanceTime,
  };
}