import styles from "./TravelOverlay.module.css";

type TravelOverlayProps = {
  location: string;
  method: "walk" | "bus";
  isNight: boolean;
};

export default function TravelOverlay({
  location,
  method,
  isNight,
}: TravelOverlayProps) {
  const image =
    method === "bus"
      ? isNight
        ? "/images/Travel/busTravelNight.png"
        : "/images/Travel/busTravelDay.png"
      : "/images/Travel/walking.jpg";

  return (
    <div className={styles.overlay}>
      <div
        className={styles.travelBackdrop}
        style={{ backgroundImage: `url(${image})` }}
      />
      <img
        className={styles.travelImage}
        src={image}
        alt=""
      />
      <div className={styles.shade} />
      <div className={styles.content}>
        <p className={styles.method}>
          {method === "bus" ? "On the bus" : "On foot"}
        </p>
        <div className={styles.text}>
          Traveling to {location}
        </div>
        <span className={styles.progress} />
      </div>
    </div>
  );
}
