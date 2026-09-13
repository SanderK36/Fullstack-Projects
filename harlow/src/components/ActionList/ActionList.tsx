import ActionButton from "@/components/ActionButton/ActionButton";
import styles from "./ActionList.module.css";

type Choice = {
  label: string;
  action: string;
  nextScene: string;
  timeCost: number;
  travel?: boolean;
  requirements?: {
    money?: number;
  };
};

type ActionListProps = {
  title: string;
  choices: Choice[];
  onChoice: (choice: Choice) => void;
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
    (choice) => !choice.travel
  );

  const walkingChoices = choices.filter(
    (choice) =>
      choice.travel &&
      choice.action
        .toLowerCase()
        .includes("walk")
  );

  const busChoices = choices.filter(
    (choice) =>
      choice.travel &&
      choice.action
        .toLowerCase()
        .includes("bus")
  );

  function isDisabled(choice: Choice) {
    return (
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
            key={choice.action}
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