import styles from "./navigation.module.css";

export default function Navigation({
	hasBackButton = false,
	title,
}: {
	hasBackButton?: boolean;
	title: string;
}) {
	return (
		<nav
			className={styles.nav}
			style={{ justifyContent: hasBackButton ? "flex-start" : "center" }}
		>
			{hasBackButton && <a href="/">&lt; Go back</a>}
			<h1>{title}</h1>
		</nav>
	);
}
