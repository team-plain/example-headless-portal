import Navigation from "@/components/navigation";
import styles from "./page.module.css";
import Actor from "@/components/actor";
import { ActorPartsFragment } from "@team-plain/typescript-sdk";

function getFullname(actor) {
	switch (actor.__typename) {
		case "CustomerActor": {
			return actor.customer.fullName;
		}
		case "UserActor": {
			return actor.user.fullName;
		}
		case "MachineUserActor": {
			return actor.user.fullName;
		}
	}
}

export default async function ThreadPage({
	params,
}: {
	params: { threadId: string };
}) {
	const apiKey = process.env.PLAIN_API_KEY;
	if (!apiKey) {
		throw new Error("Please set the `PLAIN_API_KEY` environment variable");
	}

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
			Authorization: `Bearer ${process.env.PLAIN_API_KEY}`,
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
		<>
			<Navigation hasBackButton title={thread.title} />
			<main className={styles.main}>
				<div className={styles.timeline}>
					<div className={styles.message}>
						{timelineEntries.edges.map((e) => {
							const entry = e.node;
							console.log("ENTRY", entry.actor);

							return (
								<div key={entry.id}>
									<Actor fullName={getFullname(entry.actor)} />
									{entry.entry.components.map((component, idx) => {
										if (component.__typename === "ComponentText") {
											return (
												<div key={`comp_${component.text}`}>
													{component.text}
												</div>
											);
										}

										return <div key={`comp_${idx}`}>TODO</div>;
									})}
								</div>
							);
						})}
					</div>
				</div>

				<div className={styles.threadinfo}>jkdsfjkfsd</div>
			</main>
		</>
	);
}
