import styles from "./navigation.module.css";

export default function Navigation({
  hasBackButton = false,
  title,
}: {
  hasBackButton?: boolean;
  title: string;
}) {
  return (
    <nav className={styles.nav}>
      {hasBackButton && (
        <a href="/" className={styles.backButton}>
          &lt; Go back
        </a>
      )}
      <h1>{title}</h1>
      <a href="/thread/new" className={styles.newRequest}>
        New request
      </a>
    </nav>
  );
}
