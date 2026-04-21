type AppButtonVariant = "primary" | "secondary" | "danger";

type AppButtonProps = {
    type?: "button" | "submit" | "reset";
    variant?: AppButtonVariant;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

export function AppButton({
    type = "button",
    variant = "primary",
    disabled = false,
    onClick,
    children,
}: AppButtonProps) {
    const className = ["app-button", `app-button--${variant}`].join(" ");

    return (
        <button type={type} className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}
