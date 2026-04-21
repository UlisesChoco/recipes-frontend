type AuthFormStatusProps = {
    errorMessage?: string;
    successMessage?: string;
};

export function AuthFormStatus({ errorMessage, successMessage }: AuthFormStatusProps) {
    if (errorMessage) {
        return <p role="alert">{errorMessage}</p>;
    }

    if (successMessage) {
        return <p>{successMessage}</p>;
    }

    return null;
}