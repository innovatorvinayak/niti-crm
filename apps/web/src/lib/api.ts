const DEFAULT_API_BASE_URL = "http://localhost:8000";
export const API_BASE_URL = `${(process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/+$/, "")}/api/v1`;

export class ApiError extends Error {
    status: number;
    detail: string;

    constructor(status: number, detail: string) {
        super(detail);
        this.name = "ApiError";
        this.status = status;
        this.detail = detail;
    }
}

type ApiRequestOptions = RequestInit & {
    token?: string;
};

function getErrorMessage(payload: unknown, fallback: string): string {
    if (payload && typeof payload === "object" && "detail" in payload) {
        const detail = (payload as { detail?: unknown }).detail;
        if (typeof detail === "string" && detail.trim().length > 0) {
            return detail;
        }
    }

    return fallback;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const { token, headers, ...init } = options;

    const requestHeaders = new Headers(headers);
    if (!requestHeaders.has("Content-Type") && init.body) {
        requestHeaders.set("Content-Type", "application/json");
    }
    if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: requestHeaders,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const payload: unknown = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        throw new ApiError(response.status, getErrorMessage(payload, `Request failed with status ${response.status}`));
    }

    return payload as T;
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

