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
			<div className={styles.buttonContainerLeft}>
				{hasBackButton && (
					<a href="/" className={styles.button}>
						👈 Back
					</a>
				)}
			</div>
			<h1>{title}</h1>
			<div className={styles.buttonContainerRight}>
				<a href="/thread/new" className={styles.button}>
					💬 Contact Support
				</a>
			</div>
		</nav>
	);
}
