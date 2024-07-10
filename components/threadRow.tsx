import { plainClient } from "@/lib/plainClient";
import type { ThreadPartsFragment } from "@team-plain/typescript-sdk";
import styles from "./threadRow.module.css";

export async function ThreadRow({ thread }: { thread: ThreadPartsFragment }) {
	const customer = await plainClient.getCustomerById({
		customerId: thread.customer.id,
	});

	return (
		<a className={styles.row} href={`/thread/${thread.id}`}>
			<div>{customer.data?.fullName}</div>
			<div>
				<h3>{thread.title}</h3>
				<div>{thread.previewText}</div>
			</div>
		</a>
	);
}
