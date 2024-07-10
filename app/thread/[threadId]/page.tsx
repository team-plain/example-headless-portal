import Navigation from "@/components/navigation";
import styles from "./page.module.css";
import Actor from "@/components/actor";
import { ActorPartsFragment } from "@team-plain/typescript-sdk";
import Avatar from "@/components/avatar";

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

function getPriority(priority: 0 | 1 | 2 | 3) {
	switch (priority) {
		case 0: {
			return "Urgent";
		}
		case 1: {
			return "High";
		}
		case 2: {
			return "Normal";
		}
		case 3: {
			return "Low";
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
            description
            priority
            status
            createdAt {
              iso8601
            }
            createdBy {
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
            updatedAt {
              iso8601
            }
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
                            ... on ChatEntry {
                                chatId
                                text
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

	const thread = data.data.thread;
	const timelineEntries = thread.timelineEntries;
	return (
		<>
			<Navigation hasBackButton title={thread.title} />
			<main className={styles.main}>
				<div className={styles.timeline}>
					{timelineEntries.edges.reverse().map((e) => {
						const entry = e.node;
						if (
							entry.entry.__typename !== "CustomEntry" &&
							entry.entry.__typename !== "EmailEntry" &&
							entry.entry.__typename !== "SlackReplyEntry" &&
							entry.entry.__typename !== "SlackMessageEntry" &&
							entry.entry.__typename !== "ChatEntry"
						) {
							return null;
						}

						return (
							<div className={styles.message} key={entry.id}>
								<div className={styles.entryHeader}>
									<div className={styles.avatar}>
										{getFullname(entry.actor)[0].toUpperCase()}
									</div>
									<div>
										<div className={styles.actor}>
											{getFullname(entry.actor)}
										</div>
										<div className={styles.timestamp}>
											{entry.timestamp.iso8601}
										</div>
									</div>
								</div>
								{entry.entry.__typename === "CustomEntry" &&
									entry.entry.components.map((component, idx) => {
										if (component.__typename === "ComponentText") {
											return (
												<div
													key={`comp_${component.text}`}
													className={styles.component}
												>
													{component.text}
												</div>
											);
										}

										return <div key={`comp_${idx}`}>TODO</div>;
									})}
								{entry.entry.__typename === "ChatEntry" && (
									<div>{entry.entry.text}</div>
								)}
							</div>
						);
					})}
				</div>

				<div className={styles.threadInfo}>
					<div className={styles.title}>{thread.title}</div>
					<div className={styles.description}>{thread.description}</div>

					<div className={styles.threadInfoGrid}>
						<div className={styles.threadInfoProp}>Opened by:</div>
						<div className={styles.threadInfoDesc}>
							{getFullname(thread.createdBy)}
						</div>

						<div className={styles.threadInfoProp}>Opened:</div>
						<div className={styles.threadInfoDesc}>
							{thread.createdAt.iso8601}
						</div>

						<div className={styles.threadInfoProp}>Last activity:</div>
						<div className={styles.threadInfoDesc}>
							{thread.updatedAt.iso8601}
						</div>

						<div className={styles.threadInfoProp}>Status:</div>
						<div className={styles.threadInfoDesc}>
							In {thread.status.toLowerCase()} queue
						</div>

						<div className={styles.threadInfoProp}>Priority:</div>
						<div className={styles.threadInfoDesc}>
							{getPriority(thread.priority)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
