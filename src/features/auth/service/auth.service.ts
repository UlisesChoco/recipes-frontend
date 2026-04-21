import type {
    ApiErrorPayload,
    AuthLoginRequest,
    AuthLoginResponse,
    AuthRegisterRequest,
    AuthRegisterResponse,
} from "./auth.types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function parseApiError(response: Response): Promise<string> {
    try {
        const data = (await response.json()) as ApiErrorPayload;
        if (Array.isArray(data.message)) {
            return data.message.join(". ");
        }

        if (typeof data.message === "string" && data.message.trim().length > 0) {
            return data.message;
        }

        if (typeof data.error === "string" && data.error.trim().length > 0) {
            return data.error;
        }
    } catch {
        return `Request failed with status ${response.status}`;
    }

    return `Request failed with status ${response.status}`;
}

async function request<TResponse>(path: string, body: object): Promise<TResponse> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(await parseApiError(response));
    }

    return (await response.json()) as TResponse;
}

export const authService = {
    register(payload: AuthRegisterRequest) {
        return request<AuthRegisterResponse>("/auth/register", payload);
    },
    login(payload: AuthLoginRequest) {
        return request<AuthLoginResponse>("/auth/login", payload);
    },
};