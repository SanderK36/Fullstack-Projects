import styles from "./TravelOverlay.module.css";

type TravelOverlayProps = {
  location: string;
};

export default function TravelOverlay({
  location,
}: TravelOverlayProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.text}>
        TRAVELING TO {location.toUpperCase()}
      </div>
    </div>
  );
}