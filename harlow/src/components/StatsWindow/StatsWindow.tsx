import styles from "./StatsWindow.module.css";
import type { Player } from "@/game/types";

type StatsWindowProps = {
  player: Player;
  onClose: () => void;
};

export default function StatsWindow({ player, onClose }: StatsWindowProps) {
  return (
    <div className={styles.backdrop}>
        <div className={styles.window}>
            <h2>Stats</h2>
            <button onClick={onClose}>CLOSE</button>
            <p>Courage: {player.courage}</p>
            <p>Intelligence: {player.intelligence}</p>
            <p>Charisma: {player.charisma}</p>
            <p>Athletics: {player.athletics}</p>
            <p>Strength: {player.strength}</p>
        </div>
    </div>
  );
}