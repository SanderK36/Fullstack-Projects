"use client";

import { useState } from "react";

import styles from "./GameMenu.module.css";

type GameMenuProps = {
  onOpenCharacters: () => void;
};

export default function GameMenu({ onOpenCharacters }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openCharacters() {
    setIsOpen(false);
    onOpenCharacters();
  }

  return (
    <div className={styles.menu}>
      <button
        className={styles.toggle}
        type="button"
        aria-label="Open game menu"
        aria-expanded={isOpen}
        aria-controls="game-menu-actions"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <nav className={styles.actions} id="game-menu-actions" aria-label="Game menu">
          <button type="button" onClick={openCharacters}>
            Characters
          </button>
          <button type="button" disabled title="Save is not available yet.">
            Save
          </button>
          <button type="button" disabled title="Load is not available yet.">
            Load
          </button>
        </nav>
      )}
    </div>
  );
}
