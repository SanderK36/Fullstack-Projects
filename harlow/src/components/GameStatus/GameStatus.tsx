import type { Player, GameState } from "@/game/types"
import {formatTime} from "@/game/utils"
import styles from "./GameStatus.module.css";

type GameStatusProps = {
  player: Player;
  gameState: GameState;
}

export default function GameStatus({ player, gameState}: GameStatusProps) {
  return(
    <div className={styles.status}>
      {player.name} <br />
      {player.money}$ <br />
      {player.health}/{player.maxHealth} HP <br />
      {player.stamina}/{player.maxStamina} STAM <br/>
      <br/>
      {player.courage} Courage <br />
      {player.intelligence} Intelligence <br />
      {player.charisma} Charisma <br />
      {player.athletics} Athletics <br />
      {player.strength} Strength <br />
      {player.fear} Fear <br />
      <br />
      {gameState.dayOfWeek}<br />
      {gameState.currentMonth} {gameState.dayNumber}<br />
      {formatTime(gameState.time)}<br />
      {gameState.location}<br />
      {gameState.weather}<br />
    </div>
  )
}