import styles from "./CharacterLine.module.css";

type CharacterLineProps = {
  text: string;
};

export default function CharacterLine({
  text,
}: CharacterLineProps) {
  return (
    <div className={styles.characterLine}>

      <img
        src="/images/characters/EthanParker/EthanParker.jpg"
        alt="Ethan Parker"
        className={styles.portrait}
      />

      <div className={styles.text}>
        <strong>ETHAN</strong>

        <p>{text}</p>
      </div>

    </div>
  );
}