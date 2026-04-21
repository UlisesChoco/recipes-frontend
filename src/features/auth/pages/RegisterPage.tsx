import { AppLink } from "../../shared/components/AppLink";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
    return (
        <section aria-labelledby="register-page-title">
            <header>
                <h1 id="register-page-title">Crear cuenta</h1>
                <p>Registra tu perfil para compartir recetas y recibir feedback de la comunidad.</p>
            </header>

            <RegisterForm />

            <p>
                Si ya tienes cuenta, <AppLink to="/login">inicia sesion aqui</AppLink>.
            </p>
        </section>
    );
}