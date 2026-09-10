import type { Choice } from "@/game/choices";
import ActionButton from "@/components/ActionButton/ActionButton";
import styles from "./ActionList.module.css"

type ActionListProps = {
    title: string;
    choices: Choice[];
    onChoice: (choice: Choice) => void;
}

export default function ActionList ({ title, choices, onChoice }: ActionListProps) {
    return (
        <div className={styles.actionList}>
            <h2>{title}</h2>
            {choices.map((choice) => (
                <ActionButton key={choice.label} label={choice.label} onClick={() => onChoice(choice)}/>
            ))}
        </div>
    )
}