import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-fm-green text-white hover:bg-fm-green-dark",
  secondary:
    "bg-fm-dark text-white hover:bg-fm-dark-lighter",
  outline:
    "border-2 border-fm-green text-fm-green hover:bg-fm-green hover:text-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-200";
  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
