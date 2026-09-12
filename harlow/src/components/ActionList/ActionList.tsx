import type { GameChoice } from "@/game/choices";
import ActionButton from "@/components/ActionButton/ActionButton";
import styles from "./ActionList.module.css";

type ActionListProps = {
  title: string;
  choices: GameChoice[];
  playerMoney: number;
  onChoice: (choice: GameChoice) => void;
};

export default function ActionList({
  title,
  choices,
  playerMoney,
  onChoice,
}: ActionListProps) {
  return (
    <div className={styles.actionList}>
      <h2>{title}</h2>

      {choices.map((choice) => {
        const unavailable =
          "requirements" in choice &&
          choice.requirements?.money !== undefined &&
          playerMoney <
            choice.requirements.money;

        return (
          <ActionButton
            key={choice.label}
            label={choice.label}
            disabled={unavailable}
            onClick={() => onChoice(choice)}
          />
        );
      })}
    </div>
  );
}