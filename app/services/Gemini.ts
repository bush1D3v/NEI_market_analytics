import { post } from "@/server/HttpClient";

/**
 * @description Handles the request to send a prompt to gemini via socket.io
 *
 * @param {string} prompt - The prompt to generate the content
 * @returns Promise<void>
 * @throws {Error} If the request to the proxy fails
 */
export default async function generateContent(prompt: string): Promise<void> {
    const body = {
        parts: [
            {
                text: prompt,
            },
        ],
    };

    try {
        const response = await post("/gemini-generate", body);

        if (!response.ok) throw new Error(await response.json());

        await response.json();
    } catch (error) {
        console.error(error);
    }
}
