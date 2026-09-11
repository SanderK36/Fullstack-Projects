import styles from "./StoryLog.module.css";
import type { StoryEntry } from "@/game/story";
import ConversationLine from "@/components/ConversationLine/ConversationLine";

type StoryLogProps = {
  entries: StoryEntry[];
};

export default function StoryLog({ entries }: StoryLogProps) {
  return (
    <div className={styles.storyLog}>
      {entries.map((entry, index) => {
        if (entry.type === "thought") {
          return null;
        }
        
        if (entry.type === "conversation") {
          return (
          <ConversationLine key={index} character={entry.character} text={entry.text} />
        );
      }
      
        if (entry.type === "effect") {
          return null;
        }

        const effects: Extract<StoryEntry, { type: "effect" }>[] = [];

        let previousIndex = index - 1;

        while (
          previousIndex >= 0 &&
          entries[previousIndex].type === "effect"
        ) {
          effects.unshift(
            entries[previousIndex] as Extract<
              StoryEntry,
              { type: "effect" }
            >
          );

          previousIndex--;
        }

        return (
          <p className={styles.storyEntry} key={index}>
            {entry.text}

            {effects.map((effect, effectIndex) => (
              <span
                className={`${styles.effect} ${styles[effect.stat]}`}
                key={effectIndex}
              >
                {effect.amount > 0 ? "+" : ""}
                {effect.amount} {effect.stat.toUpperCase()}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}