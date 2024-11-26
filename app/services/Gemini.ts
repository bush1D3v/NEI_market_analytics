import { post } from "@/server/HttpClient";

/**
 * @description Handles the request to send a prompt to gemini via socket.io
 *
 * @param {string} prompt - The prompt to generate the content
 * @param {string} sessionId - The session id of the user
 * @param {string} lastUserMessage - The last user message
 * @param {string} lastBotMessage - The last bot message
 * @returns Promise<void>
 * @throws {Error} If the request to the proxy fails
 */
export default async function generateContent(prompt: string, sessionId: string, lastUserMessage?: string, lastBotMessage?: string): Promise<void> {
    const adaptedPrompt = `${prompt.trim()} /n Respond according to the user's language, directly and as briefly as possible. Text only.`;
    const body = {
        parts: [
            {
                text: lastUserMessage || "",
            },
            {
                text: lastBotMessage || "",
            },
            {
                text: adaptedPrompt,
            },
        ],
        sessionId,
    };

    try {
        const response = await post("/gemini-generate", body);

        if (!response.ok) throw new Error(await response.json());

        await response.json();
    } catch (error) {
        console.error(error);
    }
}
