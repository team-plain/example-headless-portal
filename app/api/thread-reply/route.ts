import { plainClient } from "@/lib/plainClient";
import { inspect } from "util";

export async function POST(request: Request) {
  // In production validation of the request body might be necessary.
  const body = await request.json();

  const replyRes = await plainClient.replyToThread({
    textContent: body.message,
    threadId: body.threadId,
  });
  if (replyRes.error) {
    console.error(
      inspect(replyRes.error, {
        showHidden: false,
        depth: null,
        colors: true,
      })
    );
    return new Response(replyRes.error.message, { status: 500 });
  }

  console.log("Replied to thread", body.threadId);
  return new Response("", { status: 200 });
}
