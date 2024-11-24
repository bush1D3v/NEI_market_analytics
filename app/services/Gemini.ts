import { post } from "@/server/HttpClient";

/**
 * @description Handles the request to send a prompt to gemini via socket.io
 *
 * @param {string} prompt - The prompt to generate the content
 * @returns Promise<void>
 * @throws {Error} If the request to the proxy fails
 */
export default async function generateContent(prompt: string, sessionId: string): Promise<void> {
    const adaptedPrompt = `${prompt.trim()} /n Respond according to the user's language, directly and as briefly as possible. Text only.`;
    const body = {
        parts: [
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
