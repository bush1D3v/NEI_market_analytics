import { bus } from "@/events/tokensEventEmitter";
import { get } from "@/server/HttpClient";
import type { CsrfToken } from "@/types/Tokens/CsrfToken";

/**
 * @description Handles the request to get the CSRF token.
 *
 * @returns Promise<string | undefined>
 * @throws {Error} If the request to the proxy fails
 */
export async function getCsrfToken(): Promise<string | undefined> {
    try {
        const response = await get("/csrf-token");

        if (!response.ok) throw new Error(await response.json());

        const csrfToken: CsrfToken = await response.json();

        bus.emit("getCsrfToken", { csrfToken });

        return csrfToken.csrfToken;
    } catch (error) {
        console.error(error);
    }
}
