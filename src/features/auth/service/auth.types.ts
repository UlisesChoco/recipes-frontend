export type AuthRegisterRequest = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

export type AuthRegisterResponse = {
    name: string;
    surname: string;
    email: string;
};

export type AuthLoginRequest = {
    email: string;
    password: string;
};

export type AuthLoginResponse = {
    token: string;
};

export type ApiErrorPayload = {
    message?: string | string[];
    error?: string;
};