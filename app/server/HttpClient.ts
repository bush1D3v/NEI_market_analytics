const DEFAULT_HEADERS = {
	"Content-Type": "application/json; charset=utf-8",
	Accept: "application/json",
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface HttpRequestOptions {
	method: HttpMethod;
	headers?: HeadersInit;
	body?: undefined;
}

async function httpRequest(url: string, options: HttpRequestOptions): Promise<Response> {
	const headers = {...DEFAULT_HEADERS, ...options.headers};

	return await fetch(`http://localhost:3000${url}`, {
		method: options.method,
		headers: headers,
		body: options.body ? JSON.stringify(options.body) : null,
	});
}

export async function get(endpoint: string, headers?: HeadersInit) {
	return httpRequest(endpoint, {method: "GET", headers});
}

export async function post<T>(endpoint: string, body: undefined, headers?: HeadersInit) {
	return httpRequest(endpoint, {method: "POST", headers, body});
}

export async function put(endpoint: string, body: undefined, headers?: HeadersInit) {
	return httpRequest(endpoint, {method: "PUT", headers, body});
}

export async function patch(endpoint: string, body: undefined, headers?: HeadersInit) {
	return httpRequest(endpoint, {method: "PATCH", headers, body});
}

export async function del(endpoint: string, headers?: HeadersInit) {
	return httpRequest(endpoint, {method: "DELETE", headers});
}
