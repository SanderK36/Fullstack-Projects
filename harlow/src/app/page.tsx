"use client";

import { useState } from "react";

import GameStatus from "@/components/GameStatus/GameStatus";
import ActionList from "@/components/ActionList/ActionList";
import ActionButton from "@/components/ActionButton/ActionButton";
import StatsWindow from "@/components/StatsWindow/StatsWindow";
import StoryLog from "@/components/StoryLog/StoryLog";
import CharacterLine from "@/components/CharacterLine/CharacterLine";
import TravelOverlay from "@/components/TravelOverlay/TravelOverlay";
import TravelWindow from "@/components/TravelWindow/TravelWindow";
import InventoryWindow from "@/components/InventoryWindow/InventoryWindow";
import ShopWindow from "@/components/ShopWindow/ShopWindow";
import GameMenu from "@/components/GameMenu/GameMenu";
import CharacterWindow from "@/components/CharacterWindow/CharacterWindow";

import { isNightTime } from "@/game/utils";
import { useGame } from "@/game/useGame";
import { isExteriorScene } from "@/game/scenes";

export default function Home() {
  // The menu is intentionally UI-only: starting a game reveals the existing
  // initial state created by useGame without resetting or changing it.
  const [hasStarted, setHasStarted] = useState(false);
  const [showCharacterDirectory, setShowCharacterDirectory] = useState(false);
  const {
    gameState,
    playerState,
    currentScene,
    currentThought,
    currentEffects,
    conversation,
    conversationActive,
    activeChoices,
    activeCharacter,
    showStats,
    setShowStats,
    showInventory,
    setShowInventory,
    handleChoice,
    wait,
    travelingTo,
    showTravel,
    setShowTravel,
    walkingChoices,
    busChoices,
    goToBusStop,
    activeShop,
    setActiveShop,
    buyItem,
  } = useGame();
  const [travelMode, setTravelMode] = useState<"walk" | "bus">("walk");

  // Indoor home scenes use the compact two-column action layout.
  const homeSceneIds = [
    "hallway",
    "living-room",
    "living-room-relaxing",
    "kitchen",
    "bathroom",
    "ethan-room",
    "ethan-room-desk",
    "ethan-room-desk-empty",
    "mom-room",
    "emily-room",
    "attic",
    "basement",
    "garage",
    "garage-bench",
    "garage-bench-empty",
  ];

  const isInsideHome = homeSceneIds.includes(currentScene.id);
  // Character art has priority, then weather-specific art, then day/night art.
  const sceneImage =
    activeCharacter?.image ??
    currentScene.image.weather?.[gameState.weather] ??
    (isNightTime(gameState.time)
      ? currentScene.image.night
      : currentScene.image.day);

  if (!hasStarted) {
    return (
      <main className="mainMenu">
        <div className="mainMenuArtwork" aria-hidden="true" />
        <div className="mainMenuShade" aria-hidden="true" />

        <section className="mainMenuContent" aria-labelledby="game-title">
          <p className="mainMenuEyebrow">A small-town mystery unfolds</p>
          <h1 id="game-title">Harlow: 1982</h1>
          <div className="mainMenuActions">
            <button className="mainMenuStart" onClick={() => setHasStarted(true)}>
              New Game
            </button>
            {/* TODO: Load the saved game here once the save system exists. */}
            <button
              className="mainMenuStart mainMenuContinue"
              onClick={() => setHasStarted(true)}
            >
              Continue
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="game">
      <div className="game-panel">

        <h1>HARLOW</h1>

        <GameMenu onOpenCharacters={() => setShowCharacterDirectory(true)} />
        
        <GameStatus
          player={playerState}
          gameState={gameState}
          onStatsClick={() => setShowStats(true)}
          onInventoryClick={() => setShowInventory(true)}
        />

        <img
          key={sceneImage}
          src={sceneImage}
          alt=""
          className="scene-image"
        />

        <StoryLog
          entries={currentScene.story.filter(
            (entry) =>
              entry.type !== "thought"
          )}
          title="Scene"
          variant="narration"
        />

        {conversationActive && conversation.length > 0 && (
          <StoryLog
            entries={conversation}
            title="Conversation"
            variant="conversation"
          />
        )}

        {currentThought && (
          <CharacterLine
            key={currentThought}
            text={currentThought}
            effect={
              currentEffects[0]?.type === "effect"
                ? {
                    stat:
                      currentEffects[0].stat,
                    amount:
                      currentEffects[0].amount,
                  }
                : undefined
            }
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
        {showInventory && (
          <InventoryWindow
          inventory={playerState.inventory}
          onClose={() =>
            setShowInventory(false)
          }
          />
          )}

        {activeShop && (
          <ShopWindow
            shop={activeShop}
            playerMoney={playerState.money}
            onPurchase={buyItem}
            onClose={() => setActiveShop(null)}
          />
        )}
        {showCharacterDirectory && (
          <CharacterWindow onClose={() => setShowCharacterDirectory(false)} />
        )}

        <ActionList
          title={
            conversationActive
              ? "What do you say?"
              : "What do you want to do?"
          }
          choices={activeChoices}
          onChoice={handleChoice}
          onWalk={() => {
            setTravelMode("walk");
            setShowTravel(true);
          }}
          onBus={() => {
            setTravelMode("bus");
            setShowTravel(true);
          }}
          onGoToBusStop={goToBusStop}
          isBusStop={currentScene.id === "bus-stop"}
          canTravel={isExteriorScene(currentScene.id)}
          playerMoney={playerState.money}
          layout={isInsideHome ? "home" : "default"}
        />

        {showTravel && (
          <TravelWindow
            walkingChoices={walkingChoices}
            busChoices={busChoices}
            onChoice={handleChoice}
            onClose={() =>
              setShowTravel(false)
            }
            onTravelStart={() =>
              setShowTravel(false)
            }
            playerMoney={playerState.money}
            initialMenu={travelMode}
          />
        )}

        <div className="waitControls">
          <span>Pass time</span>
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

        {travelingTo && (
          <TravelOverlay
            location={travelingTo.location}
            method={travelingTo.method}
            isNight={travelingTo.isNight}
          />
        )}

      </div>
    </main>
  );
}
