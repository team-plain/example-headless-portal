import { PlainClient } from "@team-plain/typescript-sdk";

const apiKey = process.env.PLAIN_API_KEY;
if (!apiKey) {
	throw new Error("Please set the `PLAIN_API_KEY` environment variable");
}

export const plainClient = new PlainClient({
	apiKey,
});
