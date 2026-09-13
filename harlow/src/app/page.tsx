"use client";

import GameStatus from "@/components/GameStatus/GameStatus";
import ActionList from "@/components/ActionList/ActionList";
import StatsWindow from "@/components/StatsWindow/StatsWindow";
import StoryLog from "@/components/StoryLog/StoryLog";
import CharacterLine from "@/components/CharacterLine/CharacterLine";
import TravelOverlay from "@/components/TravelOverlay/TravelOverlay";
import TravelWindow from "@/components/TravelWindow/TravelWindow";

import { isNightTime } from "@/game/utils";
import { useGame } from "@/game/useGame";

export default function Home() {
  const {
    gameState,
    playerState,
    currentScene,
    currentThought,
    currentEffects,
    conversation,
    activeChoices,
    activeCharacter,
    showStats,
    setShowStats,
    handleChoice,
    wait,
    travelingTo,
    showTravel,
    setShowTravel,
  } = useGame();

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

        {conversation.length > 0 && (
          <StoryLog
            entries={conversation}
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

        <ActionList
          title="What do you want to do?"
          choices={activeChoices}
          onChoice={handleChoice}
          onTravel={() =>
            setShowTravel(true)
          }
          playerMoney={playerState.money}
        />

        {showTravel && (
          <TravelWindow
            onClose={() =>
              setShowTravel(false)
            }
          />
        )}

        {/* Temporary testing buttons */}

        <div>
          <button onClick={() => wait(1)}>
            Wait 1 min
          </button>

          <button onClick={() => wait(5)}>
            Wait 5 min
          </button>

          <button onClick={() => wait(10)}>
            Wait 10 min
          </button>

          <button onClick={() => wait(30)}>
            Wait 30 min
          </button>

          <button onClick={() => wait(60)}>
            Wait 1 hour
          </button>
        </div>

        {travelingTo && (
          <TravelOverlay
            location={travelingTo}
          />
        )}

      </div>
    </main>
  );
}