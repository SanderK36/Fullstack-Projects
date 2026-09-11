import styles from "./ConversationLine.module.css";

type ConversationLineProps = {
  character: string;
  text: string;
};

export default function ConversationLine({
  character,
  text,
}: ConversationLineProps) {
  const isEthan = character.toLowerCase() === "ethan";

  const portrait = isEthan
    ? "/images/characters/EthanParker/EthanParker.jpg"
    : "./images/locations/home/LindaParkerHome.jpg";

  return (
    <div
      className={`${styles.conversationLine} ${
        isEthan ? styles.ethan : styles.other
      }`}
    >
      <img
        src={portrait}
        alt={character}
        className={styles.portrait}
      />

      <div className={styles.text}>
        <strong>{character}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}