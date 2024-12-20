"use client";
import type { RequestBody } from "@/app/api/contact-form/route";
import { Button } from "@/components/button";
import { FormField } from "@/components/formField";
import Navigation from "@/components/navigation";
import { Textarea } from "@/components/textArea";
import { TextInput } from "@/components/textInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./page.module.css";

export default function NewThreadPage() {
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);

		const body: RequestBody = {
			title: subject,
			message,
		};

		try {
			const result = await fetch("/api/contact-form/", {
				method: "POST",
				body: JSON.stringify(body),
			});
			if (result.ok) {
				toast.success("Nice, we'll be in touch shortly!");
				router.push("/");
			} else {
				toast.error("Oops");
			}
		} catch (error) {
			console.error(error);
			toast.error("Oops");
		}

		setIsLoading(false);
	}

	return (
		<>
			<Navigation title="New request" hasBackButton />
			<main className={styles.main}>
				<form className={styles.form} onSubmit={onSubmit}>
					<FormField label="Subject">
						<TextInput
							value={subject}
							onChange={setSubject}
							placeholder="New request"
						/>
					</FormField>

					<FormField label="Your message">
						<Textarea
							value={message}
							onChange={setMessage}
							placeholder="Hi there, do you..."
						/>
					</FormField>

					<Button label="Send" isLoading={isLoading} isDisabled={isLoading} />
				</form>
			</main>
		</>
	);
}
