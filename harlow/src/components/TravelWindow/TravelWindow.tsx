import ActionButton from "@/components/ActionButton/ActionButton";
import styles from "./TravelWindow.module.css";

type TravelWindowProps = {
  onClose: () => void;
};

export default function TravelWindow({
  onClose,
}: TravelWindowProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <h2>TRAVEL</h2>

        <ActionButton
          label="Bus"
          onClick={() => {}}
        />

        <ActionButton
          label="Walk"
          onClick={() => {}}
        />

        <ActionButton
          label="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}