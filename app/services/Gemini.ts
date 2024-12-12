import {post} from "@/server/HttpClient";

export interface GenerateContentProps {
	prompt: string;
	sessionId: string;
	lastUserMessage?: string;
	lastBotMessage?: string;
	likeOrDislikePreviousMessage?: boolean;
}

/**
 * @description Handles the request to send a prompt to gemini via socket.io
 * @param {GenerateContentProps} data
 * @returns Promise<void>
 * @throws {Error} If the request to the proxy fails
 */
export default async function generateContent(data: GenerateContentProps): Promise<void> {
	const likeOrDislike =
		data.likeOrDislikePreviousMessage === undefined
			? ""
			: data.likeOrDislikePreviousMessage
				? "User liked the previous message."
				: "User disliked the previous message.";
	const adaptedPrompt = `${data.prompt.trim()} /n Respond according to the user's language, directly and as briefly as possible. Text only. ${likeOrDislike}`;
	const body = {
		parts: [
			{
				text: data.lastUserMessage || "",
			},
			{
				text: data.lastBotMessage || "",
			},
			{
				text: adaptedPrompt,
			},
		],
		sessionId: data.sessionId,
	};

	try {
		const response = await post("/gemini-generate", body);

		if (!response.ok) throw new Error(await response.json());

		await response.json();
	} catch (error) {
		console.error(error);
	}
}
