import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>FaceSpace</h2>

      <div className={styles.links}>
        <a href="/">Home</a>
        <a href="/friends">Friends</a>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
      </div>

      <input type="text" placeholder="Search..." className={styles.search} />
    </nav>
  );
}
export default Navbar;
