import ActionButton from "@/components/ActionButton/ActionButton";
import styles from "./InventoryWindow.module.css";

type InventoryWindowProps = {
  inventory: string[];
  onClose: () => void;
};

function getItemImage(item: string) {
  switch (item.toLowerCase()) {
    case "house key":
      return "/images/items/HouseKey.png";

    case "cigarettes":
      return "/images/items/Cigarettes.png";

    case "flashlight":
      return "/images/items/Flashlight.png";

    case "knife":
      return "/images/items/Knife.png";

    case "beer":
      return "/images/items/beer.png";

    case "steel maiden":
      return "/images/locations/NeedleGroove/shop/SteelMaiden.png";

    default:
      return null;
  }
}

export default function InventoryWindow({
  inventory,
  onClose,
}: InventoryWindowProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.window}>

        <h2>INVENTORY</h2>

        <div className={styles.grid}>
          {inventory.map((item, index) => {
            const image = getItemImage(item);

            return (
              <div
                className={styles.slot}
                key={`${item}-${index}`}
              >
                {image && (
                  <img
                    src={image}
                    alt={item}
                    className={styles.itemImage}
                  />
                )}
                <span className={styles.itemName}>{item}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.closeButton}>
          <ActionButton
            label="Close"
            onClick={onClose}
          />
        </div>

      </div>
    </div>
  );
}
