import type { Player, GameState } from "@/game/types"
import {formatTime} from "@/game/utils"
import styles from "./GameStatus.module.css";

type GameStatusProps = {
  player: Player;
  gameState: GameState;
  onStatsClick: () => void;
}

export default function GameStatus({ player, gameState, onStatsClick}: GameStatusProps) {
  return(
    <div className={styles.status}>
      <div className={styles.playerInfo}>
         <span>{player.name}</span>
         <span>{player.money}$</span>
         <span>{player.health}/{player.maxHealth} HP </span>
         <span>{player.stamina}/{player.maxStamina} STAM </span>
         <span>Fear: {player.fear}</span>
         <button onClick={onStatsClick}>STATS</button>
      </div>

      <div className={styles.skills}>
        <span>Courage: {player.courage}</span>
        <span>Intelligence: {player.intelligence}</span>
        <span>Charisma:{player.charisma}</span>
        <span>Athletics:{player.athletics}</span>
        <span>Strength:{player.strength}</span>
      </div>

      <div className={styles.worldInfo}>
        <span>Day: {gameState.dayOfWeek}</span>
        <span>Date: {gameState.currentMonth} {gameState.dayNumber}</span>
        <span>Time: {formatTime(gameState.time)}</span>
        <span>Location: {gameState.location}</span>
        <span>Weather: {gameState.weather}</span>
      </div>
    </div>
  )
}