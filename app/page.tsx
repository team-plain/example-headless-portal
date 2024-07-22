import Navigation from "@/components/navigation";
import { PaginationControls } from "@/components/paginationControls";
import { ThreadRow } from "@/components/threadRow";
import { plainClient } from "@/lib/plainClient";
import { ThreadStatus } from "@team-plain/typescript-sdk";
import styles from "./page.module.css";

export const fetchCache = "force-no-store";

// When adapting this example get the tenant id as part of auth or fetch it afterwards
const tenantExternalId = "abcd1234";

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const threads = await plainClient.getThreads({
		filters: {
			// If you want to only allow customers to view threads they have raised then you can filter by customerIds instead.
			// Note that if you provide multiple filters they are combined with AND rather than OR.
			//   customerIds: ["c_01J28ZQKJX9CVRXVHBMAXNSV5G"],
			tenantIdentifiers: [{ externalId: tenantExternalId }],
			statuses: [ThreadStatus.Todo, ThreadStatus.Snoozed],
		},
		after: searchParams.after as string | undefined,
		before: searchParams.before as string | undefined,
	});
	if (threads.error) {
		console.error(threads.error);
	}

	return (
		<>
			<Navigation title="Support Portal (Example)" />
			<main className={styles.main}>
				<h2 className={styles.title}>Support requests</h2>
				{threads.data && (
					<>
						<div className={styles.list}>
							{threads.data.threads.map((thread) => {
								return (
									<ThreadRow thread={thread} key={`thread-row-${thread.id}`} />
								);
							})}
						</div>
						<PaginationControls pageInfo={threads.data.pageInfo} />
					</>
				)}
			</main>
		</>
	);
}
