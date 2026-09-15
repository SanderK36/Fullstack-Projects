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

import { isNightTime } from "@/game/utils";
import { useGame } from "@/game/useGame";
import { isExteriorScene } from "@/game/scenes";

export default function Home() {
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

  const homeSceneIds = [
    "hallway",
    "living-room",
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
  ];

  const isInsideHome = homeSceneIds.includes(currentScene.id);

  return (
    <main className="game">
      <div className="game-panel">

        <h1>HARLOW</h1>
        
        <GameStatus
          player={playerState}
          gameState={gameState}
          onStatsClick={() => setShowStats(true)}
          onInventoryClick={() => setShowInventory(true)}
        />

        <img
          src={
            activeCharacter?.image ??
            (isNightTime(gameState.time)
              ? currentScene.image.night
              : currentScene.image.day)
          }
          alt=""
          className="scene-image"
        />

        <StoryLog
          entries={currentScene.story.filter(
            (entry) =>
              entry.type !== "thought"
          )}
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
