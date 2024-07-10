import type { PlainSDKError } from "@team-plain/typescript-sdk";
import { plainClient } from "./plainClient";
import type { ThreadTimelineResult } from "./types";

export async function fetchThreadTimelineEntries({
	threadId,
	first,
	after,
	last,
	before,
}: {
	threadId: string;
	first?: number;
	after?: string;
	last?: number;
	before?: string;
}): Promise<{
	data: ThreadTimelineResult;
	error: PlainSDKError | undefined;
}> {
	const query = `
        query threadTimeline($threadId: ID!, $first: Int, $after: String, $last: Int, $before: String) {
            thread(threadId: $threadId) {
                title
                description
                priority
                status
                createdAt {
                    __typename
                    iso8601
                }
                customer {
                    fullName
                }
                updatedAt {
                    __typename
                    iso8601
                }
                timelineEntries(first: $first, after: $after, last: $last, before: $before) {
                    edges {
                        cursor
                        node {
                            id
                            timestamp {
                                __typename
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
                    pageInfo {
                        __typename
                        hasPreviousPage
                        hasNextPage
                        startCursor
                        endCursor
                    }
                }
            }
        }
    `;

	const result = plainClient.rawRequest({
		query,
		variables: {
			threadId,
			first,
			after,
			last,
			before,
		},
	});

	const data = (await result).data as ThreadTimelineResult;
	const error = (await result).error;

	return { data, error };
}
