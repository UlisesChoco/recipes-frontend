import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../../auth/service/auth-token.storage";
import { AppLink } from "./AppLink";

export function MainHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuthToken();
        navigate("/login");
    };

    return (
        <header>
            <nav aria-label="Navegación principal de la aplicación">
                <div>
                    <AppLink to="/recipes" variant="nav">
                        Recipes Social
                    </AppLink>
                </div>

                <ul>
                    <li>
                        <AppLink to="/recipes" variant="nav">
                            Recetas públicas
                        </AppLink>
                    </li>
                    <li>
                        <AppLink to="/recipes/me" variant="nav">
                            Mis recetas
                        </AppLink>
                    </li>
                    <li>
                        <AppLink to="/recipes/new" variant="nav">
                            Crear receta
                        </AppLink>
                    </li>
                </ul>

                <button type="button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </nav>
        </header>
    );
}