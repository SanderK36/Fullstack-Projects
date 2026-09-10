import styles from "./CharacterLine.module.css";

type CharacterLineProps = {
    character: string;
    text: string;
    type: "speech" | "thought";
};

export default function CharacterLine({character, text, type,}: CharacterLineProps) {
  return (
    <div className={styles.characterLine}>
      <img
        src="/images/characters/EthanParker/EthanParker.jpg"
        alt="Ethan Parker"
        className={styles.portrait}
      />

      <div className={`${styles.text} ${styles[type]}`}>
        <strong>{character}</strong>
        {text}
      </div>
    </div>
  );
}