import { useState } from "react";
import { authService } from "../service/auth.service";
import type { AuthRegisterRequest } from "../service/auth.types";

type RegisterFormValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

const DEFAULT_VALUES: RegisterFormValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;

function validate(values: RegisterFormValues): RegisterFormErrors {
    const errors: RegisterFormErrors = {};

    if (!values.name.trim()) {
        errors.name = "El nombre es obligatorio.";
    } else if (values.name.length < 2 || values.name.length > 20 || !NAME_REGEX.test(values.name)) {
        errors.name = "El nombre debe tener entre 2 y 20 letras.";
    }

    if (!values.surname.trim()) {
        errors.surname = "El apellido es obligatorio.";
    } else if (values.surname.length < 2 || values.surname.length > 20 || !NAME_REGEX.test(values.surname)) {
        errors.surname = "El apellido debe tener entre 2 y 20 letras.";
    }

    if (!values.email.trim()) {
        errors.email = "El email es obligatorio.";
    } else if (!EMAIL_REGEX.test(values.email)) {
        errors.email = "Ingresa un email valido.";
    }

    if (!values.password.trim()) {
        errors.password = "La contrasena es obligatoria.";
    } else if (!PASSWORD_REGEX.test(values.password)) {
        errors.password = "Debe tener al menos 8 caracteres, mayuscula, minuscula y un numero.";
    }

    if (!values.confirmPassword.trim()) {
        errors.confirmPassword = "Debes confirmar la contrasena.";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Las contrasenas no coinciden.";
    }

    return errors;
}

type UseRegisterFormOptions = {
    onSuccess?: () => void;
};

export function useRegisterForm(options?: UseRegisterFormOptions) {
    const [values, setValues] = useState<RegisterFormValues>(DEFAULT_VALUES);
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [submitError, setSubmitError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: keyof RegisterFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setSubmitError("");
        setSuccessMessage("");
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
            setSuccessMessage("");

            const payload: AuthRegisterRequest = {
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
            };

            await authService.register(payload);

            setSuccessMessage("Tu cuenta fue creada correctamente. Ahora puedes iniciar sesion.");
            setValues(DEFAULT_VALUES);
            options?.onSuccess?.();
        } catch (error) {
            const message = error instanceof Error ? error.message : "No se pudo crear la cuenta.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        submitError,
        successMessage,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
}