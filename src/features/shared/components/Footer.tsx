import { AppLink } from "./AppLink";

const footerLinks = [
    { label: "Cómo funciona", href: "/#how-it-works" },
    { label: "Qué puedes hacer", href: "/#features" },
    { label: "Comunidad", href: "/#community" },
    { label: "Seguridad", href: "/#trust" },
];

export function Footer() {
    return (
        <footer className="app-footer">
            <div className="app-footer__brand">
                <p className="app-footer__title">Recipes Social</p>
                <p className="app-footer__description">
                    Un punto de encuentro para personas que aman cocinar y compartir recetas.
                </p>
            </div>

            <nav className="app-footer__nav" aria-label="Enlaces del pie de página">
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

            <p className="app-footer__copyright">&copy; 2026 Recipes Social. Todos los derechos reservados.</p>
        </footer>
    );
}