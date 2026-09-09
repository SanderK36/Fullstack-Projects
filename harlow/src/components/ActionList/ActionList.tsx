import type { ReactNode } from "react"
import styles from "./ActionList.module.css"

type ActionListProps = {
    title: string;
    children: ReactNode;
}

export default function ActionList ({ title, children }: ActionListProps) {
    return (
        <div className={styles.actionList}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}