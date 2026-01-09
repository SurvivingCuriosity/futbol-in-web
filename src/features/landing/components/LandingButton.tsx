import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

interface LandingButtonProps {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "outline" | "neutral-outline";
    size?: "md" | "lg";
    icon?: IconDefinition;
    className?: string;
}

export const LandingButton = ({
    label,
    onClick,
    variant = "primary",
    size = "md",
    icon,
    className,
}: LandingButtonProps) => {
    const baseStyles =
        "rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";

    const variants = {
        primary:
            "bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_-5px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)] border border-transparent",
        outline:
            "bg-transparent border-2 border-accent text-accent hover:bg-accent/10",
        "neutral-outline":
            "bg-transparent border-2 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white",
    };

    const sizes = {
        md: "px-5 py-2.5 text-base h-11",
        lg: "px-8 py-4 text-lg h-14",
    };

    return (
        <button
            onClick={onClick}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
        >
            {icon && <FontAwesomeIcon icon={icon} className="w-5 h-5" />}
            <span>{label}</span>
        </button>
    );
};
