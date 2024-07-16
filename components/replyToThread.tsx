"use client";

import { useCallback, useState } from "react";
import { Textarea } from "./textArea";
import { Button } from "./button";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import styles from "./replyToThread.module.css";

export function ReplyToThread() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams<{threadId: string}>();

  const sendReply = useCallback(async () => {
    try {
      const result = await fetch("/api/thread-reply/", {
        method: "POST",
        body: JSON.stringify({ message, threadId: params.threadId}),
      });
      if (result.ok) {
        toast.success("Reply sent");
        router.push("/");
      } else {
        toast.error("Oops");
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops");
    }
  }, [message, params.threadId, router]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Textarea value={message} onChange={setMessage} placeholder="" />
        <div className={styles.button}>
          <Button label="Reply" onClick={sendReply} />
        </div>
      </div>
    </div>
  );
}
