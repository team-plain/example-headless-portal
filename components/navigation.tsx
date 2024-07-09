import styles from "./navigation.module.css";
import { PlainClient } from "@team-plain/typescript-sdk";

export const fetchCache = "force-no-store";

const apiKey = process.env.PLAIN_API_KEY;
if (!apiKey) {
	throw new Error("Please set the `PLAIN_API_KEY` environment variable");
}

const client = new PlainClient({
	apiKey,
});

export default async function Navigation({
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
			{hasBackButton && <a href="/"> &lt; Go back</a>}
			<h1>Plain Headless Portal Example</h1>
		</nav>
	);
}
