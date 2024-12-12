import type {RequestResponse} from "@/types/Gemini/RequestResponse";
import type {RequestError} from "@/types/Gemini/RequestError";

export interface SocketEvents {
	connect: () => void;
	connect_error: () => void;
	error: (data: RequestError) => void;
	disconnect: () => void;
	content: (data: RequestResponse) => void;
	content_end: (sessionId: string) => void;
}
