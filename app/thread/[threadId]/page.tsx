import styles from "./page.module.css";

export default async function ThreadPage({
	params,
}: {
	params: { threadId: string };
}) {
	const data = await fetch("https://core-api.uk.plain.com/graphql/v1", {
		method: "POST",
		body: JSON.stringify({
			query: `{ 
        thread(threadId: "th_01J299WQGA3VNQ4FDECV7JK6MC") {
            title
            timelineEntries {
                edges {
                    node {
                        id
                        timestamp {
                            iso8601
                        }
                        actor {
                            __typename
                            ... on UserActor {
                                user {
                                    fullName
                                }
                            }
                            ... on CustomerActor {
                                customer {
                                    fullName
                                }
                            }
                            ... on MachineUserActor {
                                machineUser {
                                    fullName
                                }
                            }
                        }
                        entry {
                            __typename
                            ... on CustomEntry {
                                title
                                components {
                                    __typename
                                    ... on ComponentText {
                                      text
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }   
      }`,
		}),
		headers: {
			"Content-Type": "application/json",
			"Plain-Workspace-Id": "w_01J28VHKDK5PV3DJSZAA01XGAN",
			Authorization:
				"Bearer GIT_HISTORY_OVERWRITTEN",
		},
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});

	const thread = data.data.thread;
	const timelineEntries = thread.timelineEntries;
	console.log(thread);

	return (
		<main className={styles.main}>
			<h1>{thread.title}</h1>
			<div className={styles.message}>
				{timelineEntries.edges.map((entry) => {
					console.log("ENTRY", entry);
					return (
						<div key={entry.node.id}>
							{entry.node.entry.components.map((component, idx) => {
								if (component.__typename === "ComponentText") {
									return (
										<div key={`comp_${component.text}`}>{component.text}</div>
									);
								}

								return <div key={`comp_${idx}`}>TODO</div>;
							})}
						</div>
					);
				})}
			</div>
		</main>
	);
}
