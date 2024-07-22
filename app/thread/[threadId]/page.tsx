import Navigation from "@/components/navigation";
import { fetchThreadTimelineEntries } from "@/lib/fetchThreadTimelineEntries";
import { getActorFullName } from "@/lib/getActorFullName";
import { getFormattedDate } from "@/lib/getFormattedDate";
import { getPriority } from "@/lib/getPriority";
import styles from "./page.module.css";

export default async function ThreadPage({
	params,
}: {
	params: { threadId: string };
}) {
	const threadId = params.threadId;

	const { data, error } = await fetchThreadTimelineEntries({
		threadId,
		first: 100,
	});

	if (error) {
		console.error(error);
		return null;
	}

	if (!data) {
		return null;
	}

	const thread = data.thread;
	const timelineEntries = thread.timelineEntries;

	return (
		<>
			<Navigation hasBackButton title={thread.title} />
			<main className={styles.main}>
				<div className={styles.timeline}>
					{timelineEntries.edges.reverse().map((e, idx) => {
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

						const actorName =
							entry.actor.__typename === "MachineUserActor" && idx === 0
								? thread.customer.fullName
								: getActorFullName(entry.actor);

						return (
							<div className={styles.message} key={entry.id}>
								<div className={styles.attribution}>
									<span className={styles.actorName}>{actorName}</span> at{" "}
									{getFormattedDate(entry.timestamp.iso8601)}
								</div>
								<div className={styles.messageContent}>
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

											return null;
										})}
									{entry.entry.__typename === "ChatEntry" && entry.entry.text}
									{entry.entry.__typename === "EmailEntry" && (
										<div className={styles.emaiEntryContent}>
											<div className={styles.emailSubject}>
												{entry.entry.subject}
											</div>
											<div className={styles.emailParticipants}>
												From: {entry.entry.from.email}, To:{" "}
												{entry.entry.to.email}{" "}
												{entry.entry.additionalRecipients.length > 0
													? `, Bcc: ${entry.entry.additionalRecipients.map((p) => p.email).join(", ")}`
													: null}
												{entry.entry.hiddenRecipients.length > 0
													? `, Bcc: ${entry.entry.hiddenRecipients.map((p) => p.email).join(", ")}`
													: null}
											</div>
											<div className={styles.emailMarkdown}>
												{/* In a real implementation you will probably not want to render raw markdown! */}
												{entry.entry.markdownContent}
											</div>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
}
