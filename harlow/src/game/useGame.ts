import { useState } from "react";

import player from "@/game/player";
import initialGameState from "@/game/gameState";

import { advanceGameTime } from "@/game/time";
import { isNightTime } from "@/game/utils";

import {
  scenes,
  hallway,
  momConversation,
  johnnyConversation,
  walterConversation,
  margaretConversation,
  marleneConversation,
  earlConversation,
  getSceneThought,
  createWalkingChoices,
  createBusChoices,
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

  const [showInventory, setShowInventory] =
  useState(false);

  const [showTravel, setShowTravel] = useState(false);

  const [activeShop, setActiveShop] = useState<
    "gas-station" | "needle-groove" | null
  >(null);

  const [conversation, setConversation] =
    useState<StoryEntry[]>([]);

  const [conversationActive, setConversationActive] =
    useState(false);

  const [usedConversationChoices, setUsedConversationChoices] =
    useState<string[]>([]);

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

  const [travelingTo, setTravelingTo] =
    useState<{
      location: string;
      method: "walk" | "bus";
      isNight: boolean;
    } | null>(null);

  const [busStopReturnSceneId, setBusStopReturnSceneId] =
    useState("front-yard");

  const [marleneActive, setMarleneActive] =
    useState(false);

  const [deskCigarettesPickedUp, setDeskCigarettesPickedUp] =
    useState(false);

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

    return newGameState;
  }

  const activeCharacter =
    currentScene.characters?.find(
      (character) => {
        if (
          character.name === "Marlene" &&
          !marleneActive
        ) {
          return false;
        }

        const afterStart =
          character.from === undefined ||
          gameState.time >= character.from;

        const beforeEnd =
          character.until === undefined ||
          gameState.time < character.until;

        return afterStart && beforeEnd;
      }
    );

  function setCurrentSceneById(
    sceneId: string,
    time: number
  ) {
    const scene =
      scenes[
        sceneId as keyof typeof scenes
      ];

    if (!scene) {
      return;
    }

    const previousSceneId =
      currentScene.id;

    setCurrentScene(scene);

    if (
      sceneId === "hospital-reception" &&
      previousSceneId !== "hospital-reception"
    ) {
      setMarleneActive(false);
    }

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
        time
      )
    );

    setGameState(
      (previousGameState) => ({
        ...previousGameState,
        time,
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

      if (!choice.endsConversation) {
        setUsedConversationChoices((previousChoices) => [
          ...previousChoices,
          choice.label,
        ]);
      }

      if (choice.endsConversation) {
        setTimeout(() => {
          setConversation([]);
          setConversationActive(false);
          setUsedConversationChoices([]);
        }, 1200);
      }

      return;
    }

    // Check requirements
    if (
      choice.requirements?.money !== undefined &&
      playerState.money <
        choice.requirements.money
    ) {
      return;
    }

    // Start a conversation with Mom
    if (choice.action === "talkToMom") {
      setUsedConversationChoices([]);
      setConversation(
        momConversation.opening
      );

      setConversationActive(true);
    }

    if (choice.action === "goToMarleneCounter") {
      setMarleneActive(true);
    }

    if (choice.action === "leaveMarleneCounter") {
      setMarleneActive(false);
    }

    if (choice.action === "talkToMarlene") {
      setUsedConversationChoices([]);
      setConversation(marleneConversation.opening);
      setConversationActive(true);
    }

    if (choice.action === "talkToJohnny") {
      setUsedConversationChoices([]);
      setConversation(johnnyConversation.opening);
      setConversationActive(true);
    }
    
    if (choice.action === "talkToWalter") {
      setUsedConversationChoices([]);
      setConversation(walterConversation.opening);
      setConversationActive(true);
    }

    if (choice.action === "talkToMargaret") {
      setUsedConversationChoices([]);
      setConversation(margaretConversation.opening);
      setConversationActive(true);
    }

    if (choice.action === "talkToEarl") {
      setUsedConversationChoices([]);
      setConversation(earlConversation.opening);
      setConversationActive(true);
    }

    if (choice.action === "openShop") {
      setActiveShop("gas-station");
      return;
    }

    if (choice.action === "openNeedleGrooveShop") {
      setActiveShop("needle-groove");
      return;
    }

    if (choice.action === "leaveBusStop") {
      const newGameState = handleAdvanceTime(choice.timeCost);
      setCurrentSceneById(busStopReturnSceneId, newGameState.time);
      return;
    }

    // Resolve special action logic
    resolveAction(choice);

    // Travel
    if (choice.travel) {
      const destinationScene =
        scenes[
          choice.nextScene as keyof typeof scenes
        ];

      const destination =
        destinationScene?.location ??
        "Unknown";

      setTravelingTo({
        location: destination,
        method: choice.action.toLowerCase().includes("bus")
          ? "bus"
          : "walk",
        isNight: isNightTime(gameState.time),
      });

      setTimeout(() => {
        const newGameState =
          handleAdvanceTime(
            choice.timeCost
          );

        setCurrentSceneById(
          choice.nextScene,
          newGameState.time
        );

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

        setTravelingTo(null);
      }, 3000);

      return;
    }

    // Normal actions
    const newGameState =
      handleAdvanceTime(
        choice.timeCost
      );

    if (choice.action === "pickUpCigarettes") {
      setDeskCigarettesPickedUp(true);
    }

    const nextSceneId =
      choice.action === "lookAtDesk" && deskCigarettesPickedUp
        ? "ethan-room-desk-empty"
        : choice.nextScene;

    setCurrentSceneById(
      nextSceneId,
      newGameState.time
    );

    const effects = choice.effects;
    const itemToAdd = choice.itemToAdd;

    if (itemToAdd) {
      setPlayerState((previousPlayer) => ({
        ...previousPlayer,
        inventory: [...previousPlayer.inventory, itemToAdd],
      }));
    }

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

  function goToBusStop() {
    setBusStopReturnSceneId(currentScene.id);
    const newGameState = handleAdvanceTime(0);
    setCurrentSceneById("bus-stop", newGameState.time);
  }

  const choices =
    currentScene.choices.filter(
      (choice) => {
        if ( choice.action === "talkToMom" && gameState.time >= 1080) {
          return false;
        }

        if ( choice.action === "talkToJohnny" && ( gameState.time < 480 || gameState.time >= 840 )) {
          return false;
        }
        if ( choice.action === "talkToWalter" && ( gameState.time < 480 || gameState.time >= 1080)) {
          return false;
        }
        if (choice.action === "goToMarleneCounter" && marleneActive) {
          return false;
        }
        if (choice.action === "talkToMarlene" && !marleneActive) {
          return false;
        }
        if (choice.action === "leaveMarleneCounter" && !marleneActive) {
          return false;
        }
        if (
          marleneActive &&
          (choice.action === "leaveHospital" ||
            choice.action === "goToHospitalRoom")
        ) {
          return false;
        }
        if (choice.action === "talkToMargaret" && (gameState.time < 660 || gameState.time >= 900)) {
          return false;
        }
        if (choice.action === "talkToEarl" && (gameState.time < 480 || gameState.time >= 1020)) {
          return false;
        }
        if (choice.action === "pickUpCigarettes" && deskCigarettesPickedUp) {
          return false;
        }
        return true;
      }
    );
  const walkingChoices = createWalkingChoices(currentScene.id);
  const busChoices = createBusChoices();

  const conversationChoices =
    (currentScene.conversation?.choices ?? []).filter(
      (choice) =>
        choice.endsConversation ||
        !usedConversationChoices.includes(choice.label)
    );

  const activeChoices = conversationActive
    ? conversationChoices
    : choices;

  return {
    gameState,
    playerState,
    currentScene,
    currentThought,
    currentEffects,
    conversation,
    travelingTo,
    activeCharacter,

    showStats,
    setShowStats,
    
    showInventory,
    setShowInventory,

    handleChoice,
    goToBusStop,

    showTravel,
    setShowTravel,

    activeShop,
    setActiveShop,

    buyItem: (item: string, price: number) => {
      setPlayerState((previousPlayer) => {
        if (previousPlayer.money < price) {
          return previousPlayer;
        }

        return {
          ...previousPlayer,
          money: previousPlayer.money - price,
          inventory: [...previousPlayer.inventory, item],
        };
      });
    },
    
    conversationChoices,
    conversationActive,

    activeChoices,
    walkingChoices,
    busChoices,

    wait: handleAdvanceTime,
  };
}
