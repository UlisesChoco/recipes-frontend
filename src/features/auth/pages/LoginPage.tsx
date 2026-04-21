import { AppLink } from "../../shared/components/AppLink";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
    return (
        <section className="section-general" aria-labelledby="login-page-title">
            <header>
                <h1 id="login-page-title">Iniciar sesion</h1>
                <p>Accede con tu cuenta para publicar recetas y participar con calificaciones.</p>
            </header>

            <LoginForm />

            <p>
                Si todavia no tienes cuenta, <AppLink to="/register">registrate aqui</AppLink>.
            </p>
        </section>
    );
}