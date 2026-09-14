import ActionButton from "@/components/ActionButton/ActionButton";
import type { GameChoice } from "@/game/choices";
import styles from "./ActionList.module.css";

type ActionListProps = {
  title: string;
  choices: GameChoice[];
  onChoice: (choice: GameChoice) => void;
  onTravel: () => void;
  playerMoney: number;
};

export default function ActionList({
  title,
  choices,
  onChoice,
  onTravel,
  playerMoney,
}: ActionListProps) {
  const localChoices = choices.filter(
    (choice) => "response" in choice || !choice.travel
  );

  const walkingChoices = choices.filter(
    (choice) =>
      "action" in choice &&
      choice.travel &&
      choice.action
        .toLowerCase()
        .includes("walk")
  );

  const busChoices = choices.filter(
    (choice) =>
      "action" in choice &&
      choice.travel &&
      choice.action
        .toLowerCase()
        .includes("bus")
  );

  function isDisabled(choice: GameChoice) {
    return (
      "requirements" in choice &&
      choice.requirements?.money !== undefined &&
      playerMoney <
        choice.requirements.money
    );
  }

  return (
    <div className={styles.actionList}>
      <h2>{title}</h2>

      <div className={styles.actionButtons}>
        {localChoices.map((choice) => (
          <ActionButton
            key={"response" in choice ? choice.label : choice.action}
            label={choice.label}
            onClick={() => onChoice(choice)}
            disabled={isDisabled(choice)}
          />
        ))}

        {(walkingChoices.length > 0 ||
          busChoices.length > 0) && (
          <ActionButton
            label="Travel"
            onClick={onTravel}
          />
        )}
      </div>
    </div>
  );
}
