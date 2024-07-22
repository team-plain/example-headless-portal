import { getFormattedDate } from "@/lib/getFormattedDate";
import { plainClient } from "@/lib/plainClient";
import type { ThreadPartsFragment } from "@team-plain/typescript-sdk";
import styles from "./threadRow.module.css";

export async function ThreadRow({ thread }: { thread: ThreadPartsFragment }) {
	const customer = await plainClient.getCustomerById({
		customerId: thread.customer.id,
	});

	return (
		<a className={styles.row} href={`/thread/${thread.id}`}>
			<h3 className={styles.title}>💬 {thread.title}</h3>
			<div className={styles.customerRow}>
				{getFormattedDate(thread.createdAt.iso8601)} from{" "}
				{customer.data?.fullName}
			</div>
			<div className={styles.previewText}>{thread.previewText}</div>
		</a>
	);
}
