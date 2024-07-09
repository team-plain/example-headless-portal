import Navigation from "@/components/navigation";
import styles from "./page.module.css";
import { PlainClient } from "@team-plain/typescript-sdk";

export const fetchCache = "force-no-store";

const apiKey = process.env.PLAIN_API_KEY;
if (!apiKey) {
	throw new Error("Please set the `PLAIN_API_KEY` environment variable");
}

const client = new PlainClient({
	apiKey,
});

export default async function Home({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const threads = await client.getThreads({
		filters: {
			// customerIds: ["c_01J28ZQKJX9CVRXVHBMAXNSV5G"],
			tenantIdentifiers: [{ tenantId: "te_01J299SM3E25EJHT7JKYS6G7K5" }],
		},
	});

	console.log(threads.data?.threads.length);

	return (
		<>
			<Navigation title="Plain Headless Portal example" />
			<main className={styles.main}>
				<div>
					{threads.data?.threads.map((thread) => {
						return (
							<div key={`thread-row-${thread.id}`}>
								<a href={`/thread/${thread.id}`}>{thread.title}</a>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
}
