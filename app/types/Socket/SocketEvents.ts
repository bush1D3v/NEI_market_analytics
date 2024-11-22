import type { RequestResponse } from "@/types/Gemini/RequestResponse";

export interface SocketEvents {
    content: (data: RequestResponse, contentId: string) => void;
}
