import styles from "./Navbar.module.css";

type NavbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <nav className={styles.navbar} aria-label="Hovednavigasjon">
      <div className={styles.left}>
        <a href="/" className={styles.logo} aria-label="FaceSpace">
          <span className={styles.logoFull}>FaceSpace</span>
          <span className={styles.logoCompact}>F</span>
        </a>

        <input
          type="search"
          placeholder="Søk på FaceSpace"
          aria-label="Søk på FaceSpace"
          className={styles.search}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <button
          type="button"
          className={`${styles.circleButton} ${styles.searchButton}`}
          aria-label="Åpne søk"
        >
          <i className="bi bi-search" aria-hidden="true"></i>
        </button>
      </div>

      <div className={styles.links}>
        <a
          href="/"
          className={styles.active}
          aria-label="Hjem"
          aria-current="page"
        >
          <i className="bi bi-house-door-fill" aria-hidden="true"></i>
        </a>

        <a href="/friends" aria-label="Venner">
          <i className="bi bi-people" aria-hidden="true"></i>
        </a>

        <a href="/profile" aria-label="Profil">
          <i className="bi bi-person-circle" aria-hidden="true"></i>
        </a>

        <a
          href="/settings"
          className={styles.extraLink}
          aria-label="Innstillinger"
        >
          <i className="bi bi-gear" aria-hidden="true"></i>
        </a>
      </div>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.circleButton}
          aria-label="Varsler"
        >
          <i className="bi bi-bell-fill" aria-hidden="true"></i>
        </button>

        <a
          href="/settings"
          className={`${styles.circleButton} ${styles.mobileSettings}`}
          aria-label="Innstillinger"
        >
          <i className="bi bi-gear" aria-hidden="true"></i>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
