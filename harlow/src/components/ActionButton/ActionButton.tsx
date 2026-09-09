import styles from "./ActionButton.module.css"
type ActionButtonProps = {
    label: string;
    onClick: () => void;
}

export default function ActionButton({ label, onClick }: ActionButtonProps) {
    return <button className={styles.actionButton} onClick={onClick}>{label}</button>
}