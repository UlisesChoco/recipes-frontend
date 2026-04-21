import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import { AuthFormStatus } from "./AuthFormStatus";

export function LoginForm() {
    const navigate = useNavigate();
    const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } = useLoginForm({
        onSuccess: () => navigate("/recipes"),
    });

    return (
        <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isSubmitting}>
                <legend>Credenciales de acceso</legend>

                <div>
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) => handleChange("email", event.target.value)}
                        required
                    />
                    {errors.email ? <p role="alert">{errors.email}</p> : null}
                </div>

                <div>
                    <label htmlFor="login-password">Contraseña</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={(event) => handleChange("password", event.target.value)}
                        required
                    />
                    {errors.password ? <p role="alert">{errors.password}</p> : null}
                </div>

                <button type="submit">{isSubmitting ? "Ingresando..." : "Iniciar sesion"}</button>
            </fieldset>

            <AuthFormStatus errorMessage={submitError} />
        </form>
    );
}