import { AppLink } from "./AppLink";

const footerLinks = [
    { label: "Cómo funciona", href: "/#how-it-works" },
    { label: "Qué puedes hacer", href: "/#features" },
    { label: "Comunidad", href: "/#community" },
    { label: "Seguridad", href: "/#trust" },
];

export function Footer() {
    return (
        <footer>
            <div>
                <p>Recipes Social</p>
                <p>Un punto de encuentro para personas que aman cocinar y compartir recetas.</p>
            </div>

            <nav aria-label="Enlaces del pie de página">
                <ul>
                    {footerLinks.map((item) => (
                        <li key={item.href}>
                            <AppLink to={item.href} variant="nav">
                                {item.label}
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <p>&copy; 2026 Recipes Social. Todos los derechos reservados.</p>
        </footer>
    );
}