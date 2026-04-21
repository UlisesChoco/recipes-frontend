const AUTH_TOKEN_KEY = "recipes_social_auth_token";

export function setAuthToken(token: string): void {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function clearAuthToken(): void {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
}