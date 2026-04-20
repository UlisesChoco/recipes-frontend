import { Link } from "react-router-dom";

type AppLinkVariant = "inline" | "nav" | "cta";

type AppLinkProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
    variant?: AppLinkVariant;
    ariaLabel?: string;
    external?: boolean;
};

const EXTERNAL_PROTOCOL_REGEX = /^(https?:\/\/|mailto:|tel:)/i;

export function AppLink({
    to,
    children,
    className,
    variant = "inline",
    ariaLabel,
    external,
}: AppLinkProps) {
    const isHashLink = to.startsWith("#");
    const isExternalLink = external ?? EXTERNAL_PROTOCOL_REGEX.test(to);
    const baseClassName = ["app-link", `app-link--${variant}`, className].filter(Boolean).join(" ");

    if (isHashLink || isExternalLink) {
        return (
            <a
                href={to}
                className={baseClassName}
                aria-label={ariaLabel}
                {...(isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {children}
            </a>
        );
    }

    return (
        <Link to={to} className={baseClassName} aria-label={ariaLabel}>
            {children}
        </Link>
    );
}