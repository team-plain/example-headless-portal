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
    <main className={styles.main}>
      <h1>Hello</h1>
      <div>
        {threads.data?.threads.map((thread) => {
          return (
            <div key={`thread-row-${thread.id}`}>
              {thread.title} {thread.id}
            </div>
          );
        })}
      </div>
    </main>
  );
}
