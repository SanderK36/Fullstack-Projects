import ActionButton from "@/components/ActionButton/ActionButton";
import styles from "./ShopWindow.module.css";

type ShopWindowProps = {
  shop: "gas-station" | "needle-groove";
  playerMoney: number;
  inventory: string[];
  onPurchase: (item: string, price: number) => void;
  onClose: () => void;
};

const shops = {
  "gas-station": {
    title: "GAS STATION SHOP",
    items: [
      {
        name: "Cigarettes",
        price: 5,
        image: "/images/items/Cigarettes.png",
      },
      {
        name: "Beer",
        price: 4,
        image: "/images/items/beer.png",
      },
    ],
  },
  "needle-groove": {
    title: "NEEDLE & GROOVE",
    items: [
      {
        name: "Steel Maiden",
        price: 8,
        image: "/images/locations/NeedleGroove/shop/SteelMaiden.png",
      },
    ],
  },
};

export default function ShopWindow({
  shop,
  playerMoney,
  inventory,
  onPurchase,
  onClose,
}: ShopWindowProps) {
  const currentShop = shops[shop];

  return (
    <div className={styles.overlay}>
      <div className={styles.window} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h2>{currentShop.title}</h2>
          <span>${playerMoney}</span>
        </div>

        <div className={styles.items}>
          {currentShop.items.map((item) => {
            const owned = inventory.includes(item.name);
            const canAfford = playerMoney >= item.price;

            return (
              <div className={styles.item} key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <strong>{item.name}</strong>
                  <span>${item.price}</span>
                </div>
                <ActionButton
                  label={owned ? "Owned" : `Buy for $${item.price}`}
                  onClick={() => onPurchase(item.name, item.price)}
                  disabled={owned || !canAfford}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.closeButton}>
          <ActionButton label="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
