import type {
	DateTimePartsFragment,
	PageInfoPartsFragment,
	ThreadStatus,
} from "@team-plain/typescript-sdk";

export type Actor =
	| {
			__typename: "UserActor";
			user: {
				fullName: string;
			};
	  }
	| {
			__typename: "CustomerActor";
			customer: {
				fullName: string;
			};
	  }
	| {
			__typename: "MachineUserActor";
			machineUser: {
				fullName: string;
			};
	  };

export type ComponentText = {
	__typename: "ComponentText";
	text: string;
};

export type CustomTimelineEntryComponent = ComponentText;

export type CustomEntry = {
	__typename: "CustomEntry";
	title: string;
	components: [CustomTimelineEntryComponent];
};

export type Customer = {
	fullName: string;
};

export type ChatEntry = {
	__typename: "ChatEntry";
	chatId: string;
	text: string;
};

export type EmailParticipant = {
	email: string;
	name: string | null;
};

export type EmailEntry = {
	__typename: "EmailEntry";
	to: EmailParticipant;
	from: EmailParticipant;
	additionalRecipients: EmailParticipant[];
	hiddenRecipients: EmailParticipant[];
	subject: string | null;
	textContent: string | null;
	markdownContent: string | null;
};

export type SlackMessageEntry = {
	__typename: "SlackMessageEntry";
};

export type SlackReplyEntry = {
	__typename: "SlackReplyEntry";
};

export type TimelineEntry =
	| ChatEntry
	| CustomEntry
	| EmailEntry
	| SlackMessageEntry
	| SlackReplyEntry;

export type TimelineEntries = {
	cursor: string;
	node: {
		id: string;
		timestamp: DateTimePartsFragment;
		actor: Actor;
		entry: TimelineEntry;
	};
}[];

export type ThreadTimeline = {
	title: string;
	description: string;
	priority: number;
	status: ThreadStatus;
	createdAt: DateTimePartsFragment;
	customer: Customer;
	updatedAt: DateTimePartsFragment;
	timelineEntries: {
		edges: TimelineEntries;
	};
	pageInfo: PageInfoPartsFragment;
};

export type ThreadTimelineResult = {
	thread: ThreadTimeline;
};
