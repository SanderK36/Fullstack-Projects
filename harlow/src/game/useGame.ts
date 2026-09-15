import { useState } from "react";

import { resolveAction } from "@/game/actions";
import { applyEffects, effectsToStory } from "@/game/effects";
import initialGameState from "@/game/gameState";
import player from "@/game/player";
import {
  createBusChoices,
  createWalkingChoices,
  getSceneThought,
  hallway,
  scenes,
} from "@/game/scenes";
import { advanceGameTime } from "@/game/time";
import { isNightTime } from "@/game/utils";
import type { Choice, GameChoice } from "@/game/choices";
import type { StoryEntry } from "@/game/story";

const CONVERSATION_ACTIONS = new Set([
  "talkToMom",
  "talkToMarlene",
  "talkToJohnny",
  "talkToWalter",
  "talkToMargaret",
  "talkToEarl",
]);

const CONVERSATION_CLOSE_DELAY = 1200;
const TRAVEL_DURATION = 3000;

type ShopId = "gas-station" | "needle-groove";

export function useGame() {
  const [gameState, setGameState] = useState(initialGameState);
  const [playerState, setPlayerState] = useState(player);
  const [currentScene, setCurrentScene] = useState(hallway);
  const [currentThought, setCurrentThought] = useState<string | null>(
    getSceneThought(hallway.id, initialGameState.time)
  );
  const [currentEffects, setCurrentEffects] = useState<StoryEntry[]>([]);

  const [showStats, setShowStats] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showTravel, setShowTravel] = useState(false);
  const [activeShop, setActiveShop] = useState<ShopId | null>(null);

  const [conversation, setConversation] = useState<StoryEntry[]>([]);
  const [conversationActive, setConversationActive] = useState(false);
  const [usedConversationChoices, setUsedConversationChoices] = useState<string[]>([]);

  const [travelingTo, setTravelingTo] = useState<{
    location: string;
    method: "walk" | "bus";
    isNight: boolean;
  } | null>(null);
  const [busStopReturnSceneId, setBusStopReturnSceneId] = useState("front-yard");
  const [marleneActive, setMarleneActive] = useState(false);
  const [deskCigarettesPickedUp, setDeskCigarettesPickedUp] = useState(false);

  function advanceTime(minutes: number) {
    const nextGameState = advanceGameTime(gameState, minutes);

    setGameState(nextGameState);
    setCurrentThought(getSceneThought(currentScene.id, nextGameState.time));

    return nextGameState;
  }

  function moveToScene(sceneId: string, time: number) {
    const nextScene = scenes[sceneId as keyof typeof scenes];

    if (!nextScene) {
      return;
    }

    if (sceneId === "hospital-reception" && currentScene.id !== sceneId) {
      setMarleneActive(false);
    }

    setCurrentScene(nextScene);
    setCurrentEffects([]);
    setCurrentThought(getSceneThought(nextScene.id, time));
    setGameState((previous) => ({
      ...previous,
      time,
      location: nextScene.location,
    }));
  }

  function openConversation() {
    const opening = currentScene.conversation?.opening;

    if (!opening) {
      return;
    }

    setUsedConversationChoices([]);
    setConversation(opening);
    setConversationActive(true);
  }

  function closeConversation() {
    window.setTimeout(() => {
      setConversation([]);
      setConversationActive(false);
      setUsedConversationChoices([]);
    }, CONVERSATION_CLOSE_DELAY);
  }

  function applyChoiceEffects(choice: Choice) {
    if (!choice.effects) {
      return;
    }

    setPlayerState((previous) => applyEffects(previous, choice.effects!));
    setCurrentEffects(effectsToStory(choice.effects));
  }

  function handleConversationChoice(choice: Extract<GameChoice, { response: StoryEntry[] }>) {
    setConversation((previous) => [...previous, ...choice.response]);

    if (choice.endsConversation) {
      closeConversation();
      return;
    }

    setUsedConversationChoices((previous) => [...previous, choice.label]);
  }

  function handleTravel(choice: Choice) {
    const destination = scenes[choice.nextScene as keyof typeof scenes]?.location ?? "Unknown";

    setTravelingTo({
      location: destination,
      method: choice.action.toLowerCase().includes("bus") ? "bus" : "walk",
      isNight: isNightTime(gameState.time),
    });

    window.setTimeout(() => {
      const nextGameState = advanceTime(choice.timeCost);
      moveToScene(choice.nextScene, nextGameState.time);
      applyChoiceEffects(choice);
      setTravelingTo(null);
    }, TRAVEL_DURATION);
  }

  function handleChoice(choice: GameChoice) {
    if ("response" in choice) {
      handleConversationChoice(choice);
      return;
    }

    if (choice.requirements?.money !== undefined && playerState.money < choice.requirements.money) {
      return;
    }

    if (CONVERSATION_ACTIONS.has(choice.action)) {
      openConversation();
    }

    if (choice.action === "goToMarleneCounter") {
      setMarleneActive(true);
    }

    if (choice.action === "leaveMarleneCounter") {
      setMarleneActive(false);
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
      const nextGameState = advanceTime(choice.timeCost);
      moveToScene(busStopReturnSceneId, nextGameState.time);
      return;
    }

    resolveAction(choice);

    if (choice.travel) {
      handleTravel(choice);
      return;
    }

    const nextGameState = advanceTime(choice.timeCost);

    if (choice.action === "pickUpCigarettes") {
      setDeskCigarettesPickedUp(true);
    }

    const nextSceneId =
      choice.action === "lookAtDesk" && deskCigarettesPickedUp
        ? "ethan-room-desk-empty"
        : choice.nextScene;

    moveToScene(nextSceneId, nextGameState.time);

    if (choice.itemToAdd) {
      setPlayerState((previous) => ({
        ...previous,
        inventory: [...previous.inventory, choice.itemToAdd!],
      }));
    }

    applyChoiceEffects(choice);
  }

  function goToBusStop() {
    setBusStopReturnSceneId(currentScene.id);
    const nextGameState = advanceTime(0);
    moveToScene("bus-stop", nextGameState.time);
  }

  function isChoiceAvailable(choice: Choice) {
    const { action } = choice;
    const { time } = gameState;

    if (action === "talkToMom") return time < 1080;
    if (action === "talkToJohnny") return time >= 480 && time < 840;
    if (action === "talkToWalter") return time >= 480 && time < 1080;
    if (action === "talkToMargaret") return time >= 660 && time < 900;
    if (action === "talkToEarl") return time >= 480 && time < 1020;
    if (action === "goToMarleneCounter") return !marleneActive;
    if (action === "talkToMarlene" || action === "leaveMarleneCounter") return marleneActive;
    if (marleneActive && (action === "leaveHospital" || action === "goToHospitalRoom")) return false;
    if (action === "pickUpCigarettes") return !deskCigarettesPickedUp;

    return true;
  }

  const activeCharacter = currentScene.characters?.find((character) => {
    if (character.name === "Marlene" && !marleneActive) {
      return false;
    }

    return (
      (character.from === undefined || gameState.time >= character.from) &&
      (character.until === undefined || gameState.time < character.until)
    );
  });

  const activeChoices = conversationActive
    ? (currentScene.conversation?.choices ?? []).filter(
        (choice) => choice.endsConversation || !usedConversationChoices.includes(choice.label)
      )
    : currentScene.choices.filter(isChoiceAvailable);

  return {
    gameState,
    playerState,
    currentScene,
    currentThought,
    currentEffects,
    conversation,
    conversationActive,
    activeCharacter,
    activeChoices,
    travelingTo,
    walkingChoices: createWalkingChoices(currentScene.id),
    busChoices: createBusChoices(),
    showStats,
    setShowStats,
    showInventory,
    setShowInventory,
    showTravel,
    setShowTravel,
    activeShop,
    setActiveShop,
    handleChoice,
    goToBusStop,
    wait: advanceTime,
    buyItem: (item: string, price: number) => {
      setPlayerState((previous) => {
        if (previous.money < price) {
          return previous;
        }

        return {
          ...previous,
          money: previous.money - price,
          inventory: [...previous.inventory, item],
        };
      });
    },
  };
}
