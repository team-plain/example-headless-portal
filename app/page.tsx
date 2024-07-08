import styles from "./page.module.css";
import { PlainClient } from "@team-plain/typescript-sdk";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);

  const apiKey = process.env.PLAIN_API_KEY;
  if (!apiKey) {
    return (
      <main className={styles.main}>
        Please set the `PLAIN_API_KEY` environment variable
      </main>
    );
  }
  const client = new PlainClient({
    apiKey,
  });
  const threads = await client.getThreads({});

  console.log(threads);

  return <main className={styles.main}>Hello</main>;
}
