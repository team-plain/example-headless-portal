import styles from "./actor.module.css";

export default function Actor({
	fullName,
}: {
	fullName: string;
}) {
	return (
		<div className={styles.actor}>
			<div className={styles.avatar}>{fullName[0].toUpperCase()}</div>
			<div>{fullName}</div>
		</div>
	);
}
