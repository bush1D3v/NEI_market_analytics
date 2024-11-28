import getCookie from "@/utils/getCookie";

interface DefaultHeaders {
    "Content-Type": string;
    "Accept": string;
    "x-csrf-token"?: string;
}

const DEFAULT_HEADERS: DefaultHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json",
};

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface HttpRequestOptions {
    method: HttpMethod;
    headers?: HeadersInit;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body?: any;
}

function setCookies() {
    const csrf_token = getCookie("x-csrf-token") as string;
    DEFAULT_HEADERS[ "x-csrf-token" ] = csrf_token;
}

async function httpRequest(url: string, options: HttpRequestOptions): Promise<Response> {
    setCookies()
    const headers = { ...DEFAULT_HEADERS, ...options.headers };

    return await fetch(`${SERVER_HOST}:${SERVER_PORT}${url}`, {
        method: options.method,
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : null,
    });
}

export async function get(endpoint: string, headers?: HeadersInit) {
    return httpRequest(endpoint, { method: "GET", headers });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function post<T>(endpoint: string, body: any, headers?: HeadersInit) {
    return httpRequest(endpoint, { method: "POST", headers, body });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function put(endpoint: string, body: any, headers?: HeadersInit) {
    return httpRequest(endpoint, { method: "PUT", headers, body });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function patch(endpoint: string, body: any, headers?: HeadersInit) {
    return httpRequest(endpoint, { method: "PATCH", headers, body });
}

export async function del(endpoint: string, headers?: HeadersInit) {
    return httpRequest(endpoint, { method: "DELETE", headers });
}
