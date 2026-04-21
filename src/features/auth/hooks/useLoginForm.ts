import { useState } from "react";
import { authService } from "../service/auth.service";
import { setAuthToken } from "../service/auth-token.storage";

type LoginFormValues = {
    email: string;
    password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const DEFAULT_VALUES: LoginFormValues = {
    email: "",
    password: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginFormValues): LoginFormErrors {
    const errors: LoginFormErrors = {};

    if (!values.email.trim()) {
        errors.email = "El email es obligatorio.";
    } else if (!EMAIL_REGEX.test(values.email)) {
        errors.email = "Ingresa un email valido.";
    }

    if (!values.password.trim()) {
        errors.password = "La contrasena es obligatoria.";
    }

    return errors;
}

type UseLoginFormOptions = {
    onSuccess?: () => void;
};

export function useLoginForm(options?: UseLoginFormOptions) {
    const [values, setValues] = useState<LoginFormValues>(DEFAULT_VALUES);
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [submitError, setSubmitError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: keyof LoginFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setSubmitError("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validate(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError("");
            const response = await authService.login(values);
            setAuthToken(response.token);
            options?.onSuccess?.();
        } catch (error) {
            const message = error instanceof Error ? error.message : "No se pudo iniciar sesion.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        submitError,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
}