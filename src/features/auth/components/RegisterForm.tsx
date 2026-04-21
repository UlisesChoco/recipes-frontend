import { useRegisterForm } from "../hooks/useRegisterForm";
import { AuthFormStatus } from "./AuthFormStatus";

export function RegisterForm() {
    const { values, errors, submitError, successMessage, isSubmitting, handleChange, handleSubmit } =
        useRegisterForm();

    return (
        <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isSubmitting}>
                <legend>Datos para crear tu cuenta</legend>

                <div>
                    <label htmlFor="register-name">Nombre</label>
                    <input
                        id="register-name"
                        name="name"
                        type="text"
                        autoComplete="given-name"
                        value={values.name}
                        onChange={(event) => handleChange("name", event.target.value)}
                        required
                    />
                    {errors.name ? <p role="alert">{errors.name}</p> : null}
                </div>

                <div>
                    <label htmlFor="register-surname">Apellido</label>
                    <input
                        id="register-surname"
                        name="surname"
                        type="text"
                        autoComplete="family-name"
                        value={values.surname}
                        onChange={(event) => handleChange("surname", event.target.value)}
                        required
                    />
                    {errors.surname ? <p role="alert">{errors.surname}</p> : null}
                </div>

                <div>
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
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
                    <label htmlFor="register-password">Contraseña</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={(event) => handleChange("password", event.target.value)}
                        required
                    />
                    {errors.password ? <p role="alert">{errors.password}</p> : null}
                </div>

                <div>
                    <label htmlFor="register-confirm-password">Repetir contraseña</label>
                    <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={values.confirmPassword}
                        onChange={(event) => handleChange("confirmPassword", event.target.value)}
                        required
                    />
                    {errors.confirmPassword ? <p role="alert">{errors.confirmPassword}</p> : null}
                </div>

                <button type="submit">{isSubmitting ? "Creando cuenta..." : "Crear cuenta"}</button>
            </fieldset>

            <AuthFormStatus errorMessage={submitError} successMessage={successMessage} />
        </form>
    );
}